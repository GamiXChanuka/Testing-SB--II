/**
 * Cart Screen
 *
 * Displays the user's shopping cart with items they've added.
 * Users can modify quantities and proceed to checkout.
 */

import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { Button, Card, ScreenContainer, ScreenFooter, ScreenHeader, Text } from '@app/components';
import { Routes } from '@app/navigation/types';
import { colors, radii, spacing } from '@app/theme';

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
    <Card style={styles.cartItem}>
      <View style={styles.cartItemContent}>
        <View style={styles.cartItemInfo}>
          <Text variant="body" weight="semibold">
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.price}>
            ${item.price.toFixed(2)}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && styles.quantityButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Decrease quantity of ${item.name}`}
          >
            <Text variant="body" weight="bold">
              -
            </Text>
          </Pressable>
          <Text variant="body" weight="medium" style={styles.quantityText}>
            {item.quantity}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && styles.quantityButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Increase quantity of ${item.name}`}
          >
            <Text variant="body" weight="bold">
              +
            </Text>
          </Pressable>
        </View>
      </View>
    </Card>
  );

  return (
    <ScreenContainer edges={['bottom']}>
      <ScreenHeader>
        <Text variant="heading">Your Cart</Text>
        <Text variant="bodySmall" style={styles.subtitle}>
          {MOCK_CART_ITEMS.length} items
        </Text>
      </ScreenHeader>

      <FlatList
        data={MOCK_CART_ITEMS}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="body" color={colors.neutral.text.secondary}>
              Your cart is empty
            </Text>
          </View>
        }
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text variant="body" color={colors.neutral.text.secondary}>
            Subtotal
          </Text>
          <Text variant="body">${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text variant="body" color={colors.neutral.text.secondary}>
            Delivery Fee
          </Text>
          <Text variant="body">${deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text variant="title" weight="bold">
            Total
          </Text>
          <Text variant="title" weight="bold" color={colors.primary.main}>
            ${total.toFixed(2)}
          </Text>
        </View>
      </View>

      <ScreenFooter bordered={false}>
        <Button
          fullWidth
          onPress={handleCheckout}
          accessibilityLabel={`Proceed to checkout, total $${total.toFixed(2)}`}
        >
          Proceed to Checkout
        </Button>
      </ScreenFooter>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.xs,
  },
  listContent: {
    padding: spacing.md,
  },
  cartItem: {
    marginBottom: spacing.sm,
  },
  cartItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemInfo: {
    flex: 1,
  },
  price: {
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
  quantityButtonPressed: {
    backgroundColor: colors.neutral.disabled,
  },
  quantityText: {
    marginHorizontal: spacing.md,
    minWidth: 24,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
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
  totalRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    marginBottom: 0,
  },
});
