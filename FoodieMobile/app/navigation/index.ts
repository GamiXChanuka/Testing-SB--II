/**
 * Navigation configuration for the Foodie application.
 * This file serves as the barrel export for navigation-related modules.
 */

// Types and route definitions
export {
  Routes,
  type RouteName,
  type RootTabParamList,
  type HomeStackParamList,
  type OrdersStackParamList,
  type SettingsStackParamList,
  type RestaurantListScreenProps,
  type RestaurantDetailsScreenProps,
  type CartScreenProps,
  type CheckoutScreenProps,
  type OrderConfirmationScreenProps,
  type OrderHistoryScreenProps,
  type OrderStatusScreenProps,
  type SettingsScreenProps,
} from './types';

// Navigation container
export { AppNavigationContainer } from './NavigationContainer';

// Stack navigators
export { HomeStack } from './HomeStack';
export { OrdersStack } from './OrdersStack';
export { SettingsStack } from './SettingsStack';

// Root navigator
export { RootNavigator } from './RootNavigator';
