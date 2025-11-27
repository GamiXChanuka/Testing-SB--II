/**
 * Home Stack Navigator
 *
 * Contains the main ordering flow screens:
 * Restaurant List → Restaurant Details → Cart → Checkout → Order Confirmation
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  CartScreen,
  CheckoutScreen,
  OrderConfirmationScreen,
  RestaurantDetailsScreen,
  RestaurantListScreen,
} from '@app/screens';
import { colors, typography } from '@app/theme';

import { HomeStackParamList, Routes } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Default screen options for the Home stack.
 */
const screenOptions = {
  headerStyle: {
    backgroundColor: colors.neutral.surface,
  },
  headerTintColor: colors.neutral.text.primary,
  headerTitleStyle: {
    fontWeight: '600' as const,
    fontSize: typography.fontSize.lg,
  },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  animation: 'slide_from_right' as const,
};

/**
 * HomeStack contains the main ordering journey screens.
 */
export const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Routes.RESTAURANT_LIST}
        component={RestaurantListScreen}
        options={{
          headerShown: false, // Custom header in screen
        }}
      />
      <Stack.Screen
        name={Routes.RESTAURANT_DETAILS}
        component={RestaurantDetailsScreen}
        options={({ route }) => ({
          title: route.params.restaurantName ?? 'Restaurant',
        })}
      />
      <Stack.Screen
        name={Routes.CART}
        component={CartScreen}
        options={{
          title: 'Your Cart',
        }}
      />
      <Stack.Screen
        name={Routes.CHECKOUT}
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
        }}
      />
      <Stack.Screen
        name={Routes.ORDER_CONFIRMATION}
        component={OrderConfirmationScreen}
        options={{
          title: 'Order Confirmed',
          headerShown: false, // Full screen confirmation
          gestureEnabled: false, // Prevent swiping back after order placed
        }}
      />
    </Stack.Navigator>
  );
};
