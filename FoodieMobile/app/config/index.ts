/**
 * Application configuration module.
 * Provides environment-aware configuration values.
 */

import type { Environment } from '@app/types';

/**
 * Configuration interface defining all app configuration values.
 */
export interface AppConfig {
  /** Current environment (development, staging, production) */
  environment: Environment;
  /** Base URL for API requests */
  apiBaseUrl: string;
  /** API request timeout in milliseconds */
  apiTimeout: number;
  /** Whether to enable debug logging */
  enableDebugLogging: boolean;
  /** Whether to enable analytics in this environment */
  enableAnalytics: boolean;
  /** App version string */
  appVersion: string;
}

/**
 * Environment-specific configurations.
 * In a real app, these would be loaded from environment variables or build configs.
 */
const configs: Record<Environment, Omit<AppConfig, 'appVersion'>> = {
  development: {
    environment: 'development',
    apiBaseUrl: 'https://api.dev.foodie.example.com',
    apiTimeout: 30000,
    enableDebugLogging: true,
    enableAnalytics: false,
  },
  staging: {
    environment: 'staging',
    apiBaseUrl: 'https://api.staging.foodie.example.com',
    apiTimeout: 30000,
    enableDebugLogging: true,
    enableAnalytics: true,
  },
  production: {
    environment: 'production',
    apiBaseUrl: 'https://api.foodie.example.com',
    apiTimeout: 15000,
    enableDebugLogging: false,
    enableAnalytics: true,
  },
};

/**
 * Determine current environment.
 * In a real app, this would read from __DEV__, env vars, or build configuration.
 */
const getCurrentEnvironment = (): Environment => {
  // __DEV__ is a React Native global that indicates development mode
  if (__DEV__) {
    return 'development';
  }
  // In production builds, you would typically set this via build configuration
  // For now, default to production for non-dev builds
  return 'production';
};

/**
 * Current environment identifier.
 */
export const currentEnvironment: Environment = getCurrentEnvironment();

/**
 * Application configuration for the current environment.
 */
export const config: AppConfig = {
  ...configs[currentEnvironment],
  appVersion: '0.1.0',
};

/**
 * Check if the app is running in development mode.
 */
export const isDevelopment = (): boolean => config.environment === 'development';

/**
 * Check if the app is running in production mode.
 */
export const isProduction = (): boolean => config.environment === 'production';

/**
 * Check if the app is running in staging mode.
 */
export const isStaging = (): boolean => config.environment === 'staging';
