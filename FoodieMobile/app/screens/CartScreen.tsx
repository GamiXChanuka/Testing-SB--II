/**
 * Cart Screen
 *
 * Displays the user's shopping cart with items they've added.
 * Users can modify quantities and proceed to checkout.
 */

import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes } from '@app/navigation/types';
import { colors, radii, shadows, spacing, typography } from '@app/theme';

import type { CartScreenProps } from '@app/navigation/types';

/**
 * Mock cart items for placeholder display.
 */
const MOCK_CART_ITEMS = [
  { id: '1', name: 'Margherita Pizza', price: 12.99, quantity: 1 },
  { id: '2', name: 'Caesar Salad', price: 8.99, quantity: 2 },
  { id: '3', name: 'Garlic Bread', price: 5.99, quantity: 1 },
];

type CartItem = (typeof MOCK_CART_ITEMS)[number];

/**
 * CartScreen displays items in the user's cart.
 */
export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    navigation.navigate(Routes.CHECKOUT);
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          accessibilityRole="button"
          accessibilityLabel={`Decrease quantity of ${item.name}`}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          accessibilityRole="button"
          accessibilityLabel={`Increase quantity of ${item.name}`}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <Text style={styles.headerSubtitle}>{MOCK_CART_ITEMS.length} items</Text>
      </View>

      <FlatList
        data={MOCK_CART_ITEMS}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        }
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          accessibilityRole="button"
          accessibilityLabel={`Proceed to checkout, total $${total.toFixed(2)}`}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
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
  header: {
    padding: spacing.lg,
    backgroundColor: colors.neutral.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.text.primary,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xs,
  },
  listContent: {
    padding: spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
    ...shadows.sm,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
  },
  cartItemPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xs,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.neutral.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.text.primary,
  },
  quantityText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral.text.primary,
    marginHorizontal: spacing.md,
    minWidth: 24,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.text.secondary,
  },
  summary: {
    padding: spacing.lg,
    backgroundColor: colors.neutral.surface,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.text.secondary,
  },
  summaryValue: {
    fontSize: typography.fontSize.base,
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
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.text.primary,
  },
  totalValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.neutral.surface,
  },
  checkoutButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.contrast,
  },
});
