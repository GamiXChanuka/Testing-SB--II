/**
 * React Query Hooks for API Integration
 *
 * Custom hooks that wrap API calls with React Query for
 * caching, refetching, and state management.
 */

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { logger } from '@app/logging';
import { queryKeys } from '@app/query';

import { healthQueryFn } from './health';

import type { HealthStatus } from '@app/types';

/**
 * Configuration options for useHealthCheck hook.
 */
export interface UseHealthCheckOptions {
  /** Whether the query should be enabled */
  enabled?: boolean;
  /** How often to refetch (in milliseconds) */
  refetchInterval?: number | false;
  /** Whether to refetch on mount */
  refetchOnMount?: boolean | 'always';
}

/**
 * Hook for checking API health status.
 *
 * Returns a sanitized health status that is safe for UI display.
 * Detailed error information is logged internally but not exposed.
 *
 * @param options - Optional configuration for the query
 * @returns React Query result with health status
 *
 * @example
 * ```tsx
 * const { data, isLoading, isError, refetch } = useHealthCheck();
 *
 * if (isLoading) return <LoadingSpinner />;
 * if (data?.isAvailable) return <Text>Connected</Text>;
 * return <Text>Offline</Text>;
 * ```
 */
export const useHealthCheck = (
  options?: UseHealthCheckOptions
): UseQueryResult<HealthStatus, Error> => {
  const queryOptions: UseQueryOptions<HealthStatus, Error> = {
    queryKey: queryKeys.health,
    queryFn: healthQueryFn,
    // Health checks should be relatively fresh
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    // Don't retry aggressively for health checks
    retry: 1,
    retryDelay: 1000,
    // Apply user options
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
    refetchOnMount: options?.refetchOnMount ?? true,
  };

  const result = useQuery(queryOptions);

  // Log query state changes for debugging (only in development)
  if (result.isError && result.error) {
    logger.debug('useHealthCheck error state', {
      errorMessage: result.error.message,
    });
  }

  return result;
};

/**
 * Hook for performing a one-time connectivity check.
 *
 * Similar to useHealthCheck but configured for single use rather
 * than continuous monitoring.
 *
 * @returns React Query result with health status
 *
 * @example
 * ```tsx
 * const { data, refetch, isFetching } = useConnectivityCheck();
 *
 * const handleRetry = () => refetch();
 * ```
 */
export const useConnectivityCheck = (): UseQueryResult<HealthStatus, Error> => {
  return useHealthCheck({
    refetchInterval: false,
    refetchOnMount: 'always',
  });
};

/**
 * Hook for continuous health monitoring.
 *
 * Polls the health endpoint at regular intervals.
 * Useful for showing real-time connectivity status.
 *
 * @param intervalMs - Polling interval in milliseconds (default: 30000)
 * @returns React Query result with health status
 *
 * @example
 * ```tsx
 * // Poll every 30 seconds
 * const { data } = useHealthMonitor();
 *
 * // Poll every minute
 * const { data } = useHealthMonitor(60000);
 * ```
 */
export const useHealthMonitor = (
  intervalMs: number = 30000
): UseQueryResult<HealthStatus, Error> => {
  return useHealthCheck({
    refetchInterval: intervalMs,
    refetchOnMount: true,
  });
};
