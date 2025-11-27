/**
 * Checkout Screen
 *
 * Allows users to review their order, enter delivery details,
 * and place their order.
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes } from '@app/navigation/types';
import { colors, radii, shadows, spacing, typography } from '@app/theme';

import type { CheckoutScreenProps } from '@app/navigation/types';

/**
 * CheckoutScreen handles the final order placement flow.
 */
export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to the API
    // For now, navigate to confirmation with a mock order ID
    navigation.navigate(Routes.ORDER_CONFIRMATION, {
      orderId: 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Home</Text>
            <Text style={styles.cardText}>123 Main Street, Apt 4B</Text>
            <Text style={styles.cardText}>New York, NY 10001</Text>
            <TouchableOpacity
              style={styles.changeButton}
              accessibilityRole="button"
              accessibilityLabel="Change delivery address"
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Credit Card</Text>
            <Text style={styles.cardText}>•••• •••• •••• 4242</Text>
            <TouchableOpacity
              style={styles.changeButton}
              accessibilityRole="button"
              accessibilityLabel="Change payment method"
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.card}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items (3)</Text>
              <Text style={styles.summaryValue}>$36.96</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>$3.99</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Fee</Text>
              <Text style={styles.summaryValue}>$2.50</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxes</Text>
              <Text style={styles.summaryValue}>$3.65</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>$47.10</Text>
            </View>
          </View>
        </View>

        {/* Delivery Time Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Delivery</Text>
          <View style={styles.card}>
            <Text style={styles.deliveryTime}>25-35 minutes</Text>
            <Text style={styles.cardText}>Standard delivery</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          accessibilityRole="button"
          accessibilityLabel="Place order for $47.10"
        >
          <Text style={styles.placeOrderButtonText}>Place Order • $47.10</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
    marginBottom: spacing.xs,
  },
  cardText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginBottom: spacing.xs,
  },
  changeButton: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
  changeButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary.main,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
  },
  summaryValue: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.primary,
  },
  totalRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.text.primary,
  },
  totalValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
  },
  deliveryTime: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.text.primary,
    marginBottom: spacing.xs,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  placeOrderButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.contrast,
  },
});
