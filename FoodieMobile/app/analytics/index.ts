/**
 * Analytics abstraction layer for the Foodie application.
 * Provides a typed interface for tracking events and screen views.
 */

import { config } from '@app/config';
import { logger } from '@app/logging';

/**
 * Properties that can be attached to analytics events.
 */
export type AnalyticsEventProperties = Record<string, string | number | boolean | undefined>;

/**
 * Analytics interface for consistent tracking across the application.
 */
export interface Analytics {
  /**
   * Track a custom event with optional properties.
   */
  trackEvent: (eventName: string, properties?: AnalyticsEventProperties) => void;

  /**
   * Track a screen view event.
   */
  trackScreenView: (screenName: string, properties?: AnalyticsEventProperties) => void;

  /**
   * Identify a user for analytics tracking.
   * Note: In this story, we use anonymous/guest context.
   */
  identify: (userId: string, traits?: AnalyticsEventProperties) => void;

  /**
   * Reset analytics state (e.g., on logout).
   */
  reset: () => void;
}

/**
 * No-op analytics implementation for tests and disabled analytics.
 */
const createNoOpAnalytics = (): Analytics => ({
  trackEvent: () => {
    // No-op: Analytics disabled
  },
  trackScreenView: () => {
    // No-op: Analytics disabled
  },
  identify: () => {
    // No-op: Analytics disabled
  },
  reset: () => {
    // No-op: Analytics disabled
  },
});

/**
 * Development analytics implementation that logs events via the central logger.
 */
const createDevAnalytics = (): Analytics => ({
  trackEvent: (eventName: string, properties?: AnalyticsEventProperties): void => {
    logger.info('[Analytics] Event tracked', {
      event: eventName,
      properties: sanitizeProperties(properties),
    });
  },

  trackScreenView: (screenName: string, properties?: AnalyticsEventProperties): void => {
    logger.info('[Analytics] Screen viewed', {
      screen: screenName,
      properties: sanitizeProperties(properties),
    });
  },

  identify: (userId: string, traits?: AnalyticsEventProperties): void => {
    logger.info('[Analytics] User identified', {
      userId: maskUserId(userId),
      traits: sanitizeProperties(traits),
    });
  },

  reset: (): void => {
    logger.info('[Analytics] Analytics state reset');
  },
});

/**
 * Sanitize properties to avoid logging sensitive data.
 * Removes any properties that might contain sensitive information.
 */
const sanitizeProperties = (
  properties?: AnalyticsEventProperties
): AnalyticsEventProperties | undefined => {
  if (!properties) {
    return undefined;
  }

  const sensitiveKeys = ['password', 'token', 'secret', 'apiKey', 'creditCard', 'ssn'];
  const sanitized: AnalyticsEventProperties = {};

  for (const [key, value] of Object.entries(properties)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = sensitiveKeys.some(sensitive => lowerKey.includes(sensitive));

    if (isSensitive) {
      sanitized[key] = '[REDACTED]';
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};

/**
 * Mask user ID for logging purposes.
 */
const maskUserId = (userId: string): string => {
  if (userId.length <= 4) {
    return '****';
  }
  return `${userId.substring(0, 2)}***${userId.substring(userId.length - 2)}`;
};

/**
 * Create the appropriate analytics implementation based on environment.
 */
const createAnalytics = (): Analytics => {
  if (!config.enableAnalytics && !config.enableDebugLogging) {
    return createNoOpAnalytics();
  }

  if (config.enableDebugLogging) {
    return createDevAnalytics();
  }

  // In production without debug logging, use no-op for now.
  // Real analytics provider integration would go here.
  return createNoOpAnalytics();
};

/**
 * Singleton analytics instance for use throughout the application.
 */
export const analytics: Analytics = createAnalytics();

/**
 * Pre-defined event names for type safety and consistency.
 */
export const AnalyticsEvents = {
  // Navigation events
  SCREEN_VIEW: 'screen_view',

  // App lifecycle events
  APP_OPEN: 'app_open',
  APP_BACKGROUND: 'app_background',

  // User actions (placeholders for future implementation)
  RESTAURANT_SELECTED: 'restaurant_selected',
  ITEM_ADDED_TO_CART: 'item_added_to_cart',
  CHECKOUT_STARTED: 'checkout_started',
  ORDER_PLACED: 'order_placed',

  // Error events
  ERROR_OCCURRED: 'error_occurred',
  API_ERROR: 'api_error',
} as const;

/**
 * Pre-defined screen names for type safety and consistency.
 */
export const AnalyticsScreens = {
  RESTAURANT_LIST: 'RestaurantList',
  RESTAURANT_DETAILS: 'RestaurantDetails',
  CART: 'Cart',
  CHECKOUT: 'Checkout',
  ORDER_CONFIRMATION: 'OrderConfirmation',
  ORDER_STATUS: 'OrderStatus',
  ORDER_HISTORY: 'OrderHistory',
  SETTINGS: 'Settings',
  ERROR: 'Error',
} as const;
