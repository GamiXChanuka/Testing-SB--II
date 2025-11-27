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
