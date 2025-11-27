/**
 * Navigation type definitions for the Foodie application.
 * Provides type-safe navigation throughout the app.
 */

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Route names as constants for type-safe navigation.
 */
export const Routes = {
  // Tab routes
  HOME_TAB: 'HomeTab',
  ORDERS_TAB: 'OrdersTab',
  SETTINGS_TAB: 'SettingsTab',

  // Home stack routes
  RESTAURANT_LIST: 'RestaurantList',
  RESTAURANT_DETAILS: 'RestaurantDetails',
  CART: 'Cart',
  CHECKOUT: 'Checkout',
  ORDER_CONFIRMATION: 'OrderConfirmation',

  // Orders stack routes
  ORDER_HISTORY: 'OrderHistory',
  ORDER_STATUS: 'OrderStatus',

  // Settings stack routes
  SETTINGS: 'Settings',
} as const;

/**
 * Type for all route names.
 */
export type RouteName = (typeof Routes)[keyof typeof Routes];

/**
 * Home Stack parameter list.
 * Contains the main ordering flow screens.
 */
export type HomeStackParamList = {
  [Routes.RESTAURANT_LIST]: undefined;
  [Routes.RESTAURANT_DETAILS]: {
    restaurantId: string;
    restaurantName?: string;
  };
  [Routes.CART]: undefined;
  [Routes.CHECKOUT]: undefined;
  [Routes.ORDER_CONFIRMATION]: {
    orderId: string;
  };
};

/**
 * Orders Stack parameter list.
 * Contains order history and tracking screens.
 */
export type OrdersStackParamList = {
  [Routes.ORDER_HISTORY]: undefined;
  [Routes.ORDER_STATUS]: {
    orderId: string;
  };
};

/**
 * Settings Stack parameter list.
 * Contains profile and settings screens.
 */
export type SettingsStackParamList = {
  [Routes.SETTINGS]: undefined;
};

/**
 * Root Tab Navigator parameter list.
 * Each tab contains a nested stack navigator.
 */
export type RootTabParamList = {
  [Routes.HOME_TAB]: NavigatorScreenParams<HomeStackParamList>;
  [Routes.ORDERS_TAB]: NavigatorScreenParams<OrdersStackParamList>;
  [Routes.SETTINGS_TAB]: NavigatorScreenParams<SettingsStackParamList>;
};

/**
 * Screen props types for Home Stack screens.
 */
export type RestaurantListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, typeof Routes.RESTAURANT_LIST>,
  BottomTabScreenProps<RootTabParamList>
>;

export type RestaurantDetailsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, typeof Routes.RESTAURANT_DETAILS>,
  BottomTabScreenProps<RootTabParamList>
>;

export type CartScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, typeof Routes.CART>,
  BottomTabScreenProps<RootTabParamList>
>;

export type CheckoutScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, typeof Routes.CHECKOUT>,
  BottomTabScreenProps<RootTabParamList>
>;

export type OrderConfirmationScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, typeof Routes.ORDER_CONFIRMATION>,
  BottomTabScreenProps<RootTabParamList>
>;

/**
 * Screen props types for Orders Stack screens.
 */
export type OrderHistoryScreenProps = CompositeScreenProps<
  NativeStackScreenProps<OrdersStackParamList, typeof Routes.ORDER_HISTORY>,
  BottomTabScreenProps<RootTabParamList>
>;

export type OrderStatusScreenProps = CompositeScreenProps<
  NativeStackScreenProps<OrdersStackParamList, typeof Routes.ORDER_STATUS>,
  BottomTabScreenProps<RootTabParamList>
>;

/**
 * Screen props types for Settings Stack screens.
 */
export type SettingsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SettingsStackParamList, typeof Routes.SETTINGS>,
  BottomTabScreenProps<RootTabParamList>
>;

/**
 * Declare global navigation types for useNavigation hook.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
