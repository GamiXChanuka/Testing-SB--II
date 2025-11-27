/**
 * Health Check API Service
 *
 * Provides functions for checking API connectivity and service health.
 * Results are sanitized to avoid exposing internal environment details to the UI.
 */

import { logger } from '@app/logging';

import { get, isApiClientError } from './index';

import type { HealthCheckResponse, HealthStatus } from '@app/types';

/**
 * User-facing messages for health status.
 * These are intentionally generic to avoid leaking environment details.
 */
const STATUS_MESSAGES = {
  healthy: 'Service is available',
  degraded: 'Service is experiencing issues',
  unhealthy: 'Service is temporarily unavailable',
  error: 'Unable to connect to service',
} as const;

/**
 * Fetch the raw health check response from the API.
 * This is an internal function that returns the full API response.
 *
 * @returns Promise resolving to the health check response
 * @throws ApiClientError if the request fails
 */
export const fetchHealthCheck = async (): Promise<HealthCheckResponse> => {
  const response = await get<HealthCheckResponse>('/health');
  return response.data;
};

/**
 * Transform the API health response into a sanitized status for UI consumption.
 * This ensures no internal details (versions, environment info) leak to users.
 *
 * @param response - The raw health check response from the API
 * @returns Sanitized health status safe for UI display
 */
const sanitizeHealthResponse = (response: HealthCheckResponse): HealthStatus => {
  return {
    isAvailable: response.status === 'healthy',
    message: STATUS_MESSAGES[response.status],
    checkedAt: new Date(),
  };
};

/**
 * Create an error health status when the check fails.
 *
 * @returns Health status indicating service unavailability
 */
const createErrorHealthStatus = (): HealthStatus => {
  return {
    isAvailable: false,
    message: STATUS_MESSAGES.error,
    checkedAt: new Date(),
  };
};

/**
 * Check API health and return a sanitized status.
 * This is the primary function for UI components to use.
 *
 * Success and error details are logged internally but not exposed to the UI.
 *
 * @returns Promise resolving to sanitized health status
 */
export const checkHealth = async (): Promise<HealthStatus> => {
  try {
    const response = await fetchHealthCheck();

    // Log full details internally (not exposed to UI)
    logger.info('Health check completed', {
      status: response.status,
      timestamp: response.timestamp,
    });

    return sanitizeHealthResponse(response);
  } catch (error) {
    // Log the full error internally
    if (isApiClientError(error)) {
      logger.error('Health check failed', error, {
        code: error.code,
        status: error.status,
      });
    } else {
      logger.error('Health check failed with unexpected error', error);
    }

    // Return a safe, user-friendly status
    return createErrorHealthStatus();
  }
};

/**
 * Query function for React Query integration.
 * Wraps checkHealth to work seamlessly with useQuery.
 *
 * @returns Promise resolving to health status
 */
export const healthQueryFn = async (): Promise<HealthStatus> => {
  return checkHealth();
};
