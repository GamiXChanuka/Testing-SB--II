/**
 * Order Confirmation Screen
 *
 * Displays confirmation after an order has been successfully placed.
 * Provides options to track the order or continue browsing.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Card, ScreenContainer, Text } from '@app/components';
import { Routes } from '@app/navigation/types';
import { colors, radii, spacing } from '@app/theme';

import type { OrderConfirmationScreenProps } from '@app/navigation/types';

/**
 * OrderConfirmationScreen shows the order success message.
 */
export const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  navigation,
  route,
}) => {
  const { orderId } = route.params;

  const handleTrackOrder = () => {
    // Navigate to Orders tab and then to Order Status
    navigation.navigate(Routes.ORDERS_TAB, {
      screen: Routes.ORDER_STATUS,
      params: { orderId },
    });
  };

  const handleBackToHome = () => {
    // Reset to home tab
    navigation.navigate(Routes.HOME_TAB, {
      screen: Routes.RESTAURANT_LIST,
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Text variant="heading" style={styles.iconText}>
            ✓
          </Text>
        </View>

        {/* Success Message */}
        <Text variant="heading" align="center" style={styles.title}>
          Order Confirmed!
        </Text>
        <Text
          variant="body"
          color={colors.neutral.text.secondary}
          align="center"
          style={styles.message}
        >
          Your order has been placed successfully and is being prepared.
        </Text>

        {/* Order Details */}
        <Card style={styles.orderDetails}>
          <Text variant="bodySmall" color={colors.neutral.text.secondary} align="center">
            Order Number
          </Text>
          <Text
            variant="title"
            weight="bold"
            color={colors.primary.main}
            align="center"
            style={styles.orderId}
          >
            {orderId}
          </Text>
          <Text variant="bodySmall" color={colors.neutral.text.secondary} align="center">
            Estimated delivery: 25-35 minutes
          </Text>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            fullWidth
            onPress={handleTrackOrder}
            accessibilityLabel="Track your order"
            style={styles.trackButton}
          >
            Track Order
          </Button>

          <Button
            variant="outline"
            fullWidth
            onPress={handleBackToHome}
            accessibilityLabel="Return to home screen"
          >
            Back to Home
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: radii.full,
    backgroundColor: colors.semantic.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconText: {
    fontSize: 56,
    color: colors.neutral.white,
  },
  title: {
    marginBottom: spacing.sm,
  },
  message: {
    marginBottom: spacing.xl,
  },
  orderDetails: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  orderId: {
    marginVertical: spacing.sm,
  },
  actions: {
    width: '100%',
  },
  trackButton: {
    marginBottom: spacing.md,
  },
});
