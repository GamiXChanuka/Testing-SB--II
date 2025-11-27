/**
 * Checkout Screen
 *
 * Allows users to review their order, enter delivery details,
 * and place their order.
 */

import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button, Card, ScreenContainer, ScreenFooter, Text } from '@app/components';
import { Routes } from '@app/navigation/types';
import { colors, spacing } from '@app/theme';

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
    <ScreenContainer scroll edges={['bottom']}>
      {/* Delivery Address Section */}
      <View style={styles.section}>
        <Text variant="subtitle" weight="semibold" style={styles.sectionTitle}>
          Delivery Address
        </Text>
        <Card>
          <Text variant="body" weight="semibold">
            Home
          </Text>
          <Text variant="bodySmall" color={colors.neutral.text.secondary} style={styles.cardText}>
            123 Main Street, Apt 4B
          </Text>
          <Text variant="bodySmall" color={colors.neutral.text.secondary} style={styles.cardText}>
            New York, NY 10001
          </Text>
          <Pressable
            style={styles.changeButton}
            accessibilityRole="button"
            accessibilityLabel="Change delivery address"
          >
            <Text variant="bodySmall" weight="medium" color={colors.primary.main}>
              Change
            </Text>
          </Pressable>
        </Card>
      </View>

      {/* Payment Method Section */}
      <View style={styles.section}>
        <Text variant="subtitle" weight="semibold" style={styles.sectionTitle}>
          Payment Method
        </Text>
        <Card>
          <Text variant="body" weight="semibold">
            Credit Card
          </Text>
          <Text variant="bodySmall" color={colors.neutral.text.secondary} style={styles.cardText}>
            •••• •••• •••• 4242
          </Text>
          <Pressable
            style={styles.changeButton}
            accessibilityRole="button"
            accessibilityLabel="Change payment method"
          >
            <Text variant="bodySmall" weight="medium" color={colors.primary.main}>
              Change
            </Text>
          </Pressable>
        </Card>
      </View>

      {/* Order Summary Section */}
      <View style={styles.section}>
        <Text variant="subtitle" weight="semibold" style={styles.sectionTitle}>
          Order Summary
        </Text>
        <Card>
          <View style={styles.summaryRow}>
            <Text variant="bodySmall" color={colors.neutral.text.secondary}>
              Items (3)
            </Text>
            <Text variant="bodySmall">$36.96</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text variant="bodySmall" color={colors.neutral.text.secondary}>
              Delivery Fee
            </Text>
            <Text variant="bodySmall">$3.99</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text variant="bodySmall" color={colors.neutral.text.secondary}>
              Service Fee
            </Text>
            <Text variant="bodySmall">$2.50</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text variant="bodySmall" color={colors.neutral.text.secondary}>
              Taxes
            </Text>
            <Text variant="bodySmall">$3.65</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text variant="body" weight="bold">
              Total
            </Text>
            <Text variant="body" weight="bold" color={colors.primary.main}>
              $47.10
            </Text>
          </View>
        </Card>
      </View>

      {/* Delivery Time Section */}
      <View style={styles.section}>
        <Text variant="subtitle" weight="semibold" style={styles.sectionTitle}>
          Estimated Delivery
        </Text>
        <Card>
          <Text variant="title" weight="bold">
            25-35 minutes
          </Text>
          <Text variant="bodySmall" color={colors.neutral.text.secondary} style={styles.cardText}>
            Standard delivery
          </Text>
        </Card>
      </View>

      <ScreenFooter>
        <Button fullWidth onPress={handlePlaceOrder} accessibilityLabel="Place order for $47.10">
          Place Order • $47.10
        </Button>
      </ScreenFooter>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: spacing.md,
    paddingBottom: 0,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  cardText: {
    marginTop: spacing.xs,
  },
  changeButton: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  totalRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    marginBottom: 0,
  },
});
