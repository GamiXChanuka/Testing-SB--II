/**
 * Navigation configuration for the Foodie application.
 * This file serves as the barrel export for navigation-related modules.
 *
 * Full navigation implementation will be added in Step 3.
 * This placeholder establishes the module structure and types.
 */

/**
 * Route names used throughout the application.
 * Using const assertion for type-safe route references.
 */
export const Routes = {
  // Main tabs
  HOME_TAB: 'HomeTab',
  ORDERS_TAB: 'OrdersTab',
  SETTINGS_TAB: 'SettingsTab',

  // Home stack screens
  RESTAURANT_LIST: 'RestaurantList',
  RESTAURANT_DETAILS: 'RestaurantDetails',
  CART: 'Cart',
  CHECKOUT: 'Checkout',
  ORDER_CONFIRMATION: 'OrderConfirmation',

  // Orders stack screens
  ORDER_STATUS: 'OrderStatus',
  ORDER_HISTORY: 'OrderHistory',

  // Settings stack screens
  SETTINGS: 'Settings',
} as const;

/**
 * Type for route names.
 */
export type RouteName = (typeof Routes)[keyof typeof Routes];

/**
 * Route parameter types for type-safe navigation.
 * These will be expanded as screens are implemented.
 */
export type RootStackParamList = {
  [Routes.HOME_TAB]: undefined;
  [Routes.ORDERS_TAB]: undefined;
  [Routes.SETTINGS_TAB]: undefined;
  [Routes.RESTAURANT_LIST]: undefined;
  [Routes.RESTAURANT_DETAILS]: { restaurantId: string };
  [Routes.CART]: undefined;
  [Routes.CHECKOUT]: undefined;
  [Routes.ORDER_CONFIRMATION]: { orderId: string };
  [Routes.ORDER_STATUS]: { orderId: string };
  [Routes.ORDER_HISTORY]: undefined;
  [Routes.SETTINGS]: undefined;
};

// Navigation container
export { AppNavigationContainer } from './NavigationContainer';
