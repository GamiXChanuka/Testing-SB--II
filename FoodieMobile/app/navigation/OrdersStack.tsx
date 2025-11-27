/**
 * Orders Stack Navigator
 *
 * Contains order-related screens:
 * Order History → Order Status
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { OrderHistoryScreen, OrderStatusScreen } from '@app/screens';
import { colors, typography } from '@app/theme';

import { OrdersStackParamList, Routes } from './types';

const Stack = createNativeStackNavigator<OrdersStackParamList>();

/**
 * Default screen options for the Orders stack.
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
 * OrdersStack contains order history and tracking screens.
 */
export const OrdersStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Routes.ORDER_HISTORY}
        component={OrderHistoryScreen}
        options={{
          headerShown: false, // Custom header in screen
        }}
      />
      <Stack.Screen
        name={Routes.ORDER_STATUS}
        component={OrderStatusScreen}
        options={{
          title: 'Order Status',
        }}
      />
    </Stack.Navigator>
  );
};
