/**
 * API client module for the Foodie application.
 * Provides an Axios-based HTTP client with centralized configuration and error handling.
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { analytics, AnalyticsEvents } from '@app/analytics';
import { config } from '@app/config';
import { logger } from '@app/logging';

import type { ApiError, ApiResponse } from '@app/types';

/**
 * Symbol for storing request start time on the config object.
 */
const REQUEST_START_TIME = Symbol('requestStartTime');

/**
 * Extended config type with request timing.
 */
interface TimedAxiosRequestConfig extends InternalAxiosRequestConfig {
  [REQUEST_START_TIME]?: number;
}

/**
 * Custom error class for API errors with structured information.
 */
export class ApiClientError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly details?: Record<string, unknown>;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ApiClientError';
    this.code = error.code;
    this.status = error.status;
    this.details = error.details;
  }
}

/**
 * Map axios errors to a consistent ApiError shape.
 */
const mapAxiosError = (error: AxiosError): ApiError => {
  if (error.response) {
    // Server responded with an error status
    const status = error.response.status;
    const data = error.response.data as Record<string, unknown> | undefined;

    return {
      code: (data?.code as string) || `HTTP_${status}`,
      message: (data?.message as string) || error.message || 'An error occurred',
      status,
      details: data,
    };
  }

  if (error.request) {
    // Request was made but no response received (network error)
    return {
      code: 'NETWORK_ERROR',
      message: 'Unable to connect to the server. Please check your internet connection.',
      status: 0,
    };
  }

  // Error in request configuration
  return {
    code: 'REQUEST_ERROR',
    message: error.message || 'An error occurred while making the request.',
    status: 0,
  };
};

/**
 * Request interceptor for adding common headers, logging, and timing.
 */
const requestInterceptor = (
  requestConfig: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // Store request start time for duration calculation
  const timedConfig = requestConfig as TimedAxiosRequestConfig;
  timedConfig[REQUEST_START_TIME] = Date.now();

  logger.debug('API Request', {
    method: requestConfig.method?.toUpperCase(),
    url: requestConfig.url,
    baseURL: requestConfig.baseURL,
  });

  return requestConfig;
};

/**
 * Calculate request duration from config start time.
 */
const getRequestDuration = (config: AxiosRequestConfig): number | undefined => {
  const timedConfig = config as TimedAxiosRequestConfig;
  const startTime = timedConfig[REQUEST_START_TIME];
  if (startTime) {
    return Date.now() - startTime;
  }
  return undefined;
};

/**
 * Response interceptor for logging successful responses with timing.
 */
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  const durationMs = getRequestDuration(response.config);

  logger.debug('API Response', {
    status: response.status,
    url: response.config.url,
    durationMs,
  });

  // Log slow requests as warnings
  if (durationMs && durationMs > 3000) {
    logger.warn('Slow API request detected', {
      url: response.config.url,
      durationMs,
    });
  }

  return response;
};

/**
 * Error interceptor for logging, analytics, and transforming errors.
 */
const errorInterceptor = (error: AxiosError): Promise<never> => {
  const apiError = mapAxiosError(error);
  const durationMs = error.config ? getRequestDuration(error.config) : undefined;

  // Log the error with structured context
  logger.error('API Error', error, {
    code: apiError.code,
    status: apiError.status,
    url: error.config?.url,
    method: error.config?.method?.toUpperCase(),
    durationMs,
  });

  // Track error in analytics (without sensitive details)
  analytics.trackEvent(AnalyticsEvents.API_ERROR, {
    errorCode: apiError.code,
    statusCode: apiError.status,
    // Only include path, not query params which might contain sensitive data
    endpoint: error.config?.url?.split('?')[0],
  });

  return Promise.reject(new ApiClientError(apiError));
};

/**
 * Create the axios instance with default configuration.
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: config.apiTimeout,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // Add interceptors
  client.interceptors.request.use(requestInterceptor, errorInterceptor);
  client.interceptors.response.use(responseInterceptor, errorInterceptor);

  return client;
};

/**
 * Singleton API client instance.
 */
export const apiClient: AxiosInstance = createApiClient();

/**
 * Type-safe GET request helper.
 */
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const response = await apiClient.get<T>(url, config);
  return {
    data: response.data,
    status: response.status,
  };
};

/**
 * Type-safe POST request helper.
 */
export const post = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response = await apiClient.post<T>(url, data, config);
  return {
    data: response.data,
    status: response.status,
  };
};

/**
 * Type-safe PUT request helper.
 */
export const put = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response = await apiClient.put<T>(url, data, config);
  return {
    data: response.data,
    status: response.status,
  };
};

/**
 * Type-safe PATCH request helper.
 */
export const patch = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response = await apiClient.patch<T>(url, data, config);
  return {
    data: response.data,
    status: response.status,
  };
};

/**
 * Type-safe DELETE request helper.
 */
export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const response = await apiClient.delete<T>(url, config);
  return {
    data: response.data,
    status: response.status,
  };
};

/**
 * Check if an error is an ApiClientError.
 */
export const isApiClientError = (error: unknown): error is ApiClientError => {
  return error instanceof ApiClientError;
};

/**
 * Re-export health check services.
 */
export { checkHealth, fetchHealthCheck, healthQueryFn } from './health';

/**
 * Re-export React Query hooks for API integration.
 */
export { useHealthCheck, useConnectivityCheck, useHealthMonitor } from './hooks';
