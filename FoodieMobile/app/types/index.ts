/**
 * Global type definitions for the Foodie Mobile application.
 * This file contains shared types used across the app.
 */

/**
 * Environment types supported by the application.
 */
export type Environment = 'development' | 'staging' | 'production';

/**
 * Generic API response wrapper type.
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * Generic API error type.
 */
export interface ApiError {
  code: string;
  message: string;
  status: number;
  details?: Record<string, unknown>;
}

/**
 * Base entity interface with common fields.
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Health check response from the API.
 * Contains service status information.
 */
export interface HealthCheckResponse {
  /** Service status indicator */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** Timestamp of the health check */
  timestamp: string;
  /** Optional version information */
  version?: string;
}

/**
 * Sanitized health status for UI consumption.
 * Does not expose internal environment details.
 */
export interface HealthStatus {
  /** Whether the service is available */
  isAvailable: boolean;
  /** Human-readable status message for users */
  message: string;
  /** When the check was performed */
  checkedAt: Date;
}
