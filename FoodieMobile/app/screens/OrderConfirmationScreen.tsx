/**
 * Order Confirmation Screen
 *
 * Displays confirmation after an order has been successfully placed.
 * Provides options to track the order or continue browsing.
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes } from '@app/navigation/types';
import { colors, radii, spacing, typography } from '@app/theme';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>✓</Text>
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.message}>
          Your order has been placed successfully and is being prepared.
        </Text>

        {/* Order Details */}
        <View style={styles.orderDetails}>
          <Text style={styles.orderLabel}>Order Number</Text>
          <Text style={styles.orderId}>{orderId}</Text>
          <Text style={styles.estimatedTime}>Estimated delivery: 25-35 minutes</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.trackButton}
            onPress={handleTrackOrder}
            accessibilityRole="button"
            accessibilityLabel="Track your order"
          >
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleBackToHome}
            accessibilityRole="button"
            accessibilityLabel="Return to home screen"
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
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
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  orderDetails: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.xl,
  },
  orderLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginBottom: spacing.xs,
  },
  orderId: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
    marginBottom: spacing.md,
  },
  estimatedTime: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
  },
  actions: {
    width: '100%',
  },
  trackButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  trackButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.contrast,
  },
  homeButton: {
    backgroundColor: colors.neutral.surface,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  homeButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
  },
});
