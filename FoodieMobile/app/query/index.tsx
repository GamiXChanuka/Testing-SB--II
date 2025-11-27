/**
 * React Query (TanStack Query) configuration for the Foodie application.
 * Provides server state management and caching for API data.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

import { logger } from '@app/logging';

/**
 * Default stale time for queries (5 minutes).
 * Data is considered fresh for this duration before being refetched.
 */
const DEFAULT_STALE_TIME = 5 * 60 * 1000;

/**
 * Default cache time for queries (30 minutes).
 * Inactive queries are garbage collected after this duration.
 */
const DEFAULT_GC_TIME = 30 * 60 * 1000;

/**
 * Default retry count for failed queries.
 */
const DEFAULT_RETRY_COUNT = 3;

/**
 * Create and configure the QueryClient instance.
 */
const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_GC_TIME,
        retry: DEFAULT_RETRY_COUNT,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false, // Disable for mobile
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
        onError: (error: unknown) => {
          logger.error('Mutation error', error);
        },
      },
    },
  });
};

/**
 * Singleton QueryClient instance for use throughout the application.
 */
export const queryClient: QueryClient = createQueryClient();

/**
 * Props for the QueryProvider component.
 */
interface QueryProviderProps {
  children: ReactNode;
}

/**
 * QueryProvider component that wraps the app with React Query context.
 * This is a convenience wrapper around QueryClientProvider.
 */
export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

/**
 * Query key factory for consistent query key generation.
 * Using a factory pattern helps prevent key collisions and typos.
 */
export const queryKeys = {
  // Health/connectivity check
  health: ['health'] as const,

  // Restaurant-related queries (placeholders for future implementation)
  restaurants: {
    all: ['restaurants'] as const,
    list: (filters?: Record<string, unknown>) => ['restaurants', 'list', filters] as const,
    detail: (id: string) => ['restaurants', 'detail', id] as const,
    menu: (id: string) => ['restaurants', 'menu', id] as const,
  },

  // Order-related queries (placeholders for future implementation)
  orders: {
    all: ['orders'] as const,
    list: () => ['orders', 'list'] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
    current: () => ['orders', 'current'] as const,
    history: () => ['orders', 'history'] as const,
  },

  // Cart-related queries (placeholders for future implementation)
  cart: {
    all: ['cart'] as const,
    items: () => ['cart', 'items'] as const,
  },

  // User-related queries (placeholders for future implementation)
  user: {
    all: ['user'] as const,
    profile: () => ['user', 'profile'] as const,
    settings: () => ['user', 'settings'] as const,
  },
} as const;

/**
 * Re-export commonly used hooks and utilities from React Query.
 */
export {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
