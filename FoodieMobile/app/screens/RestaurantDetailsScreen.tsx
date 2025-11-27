/**
 * Restaurant Details Screen
 *
 * Displays the menu and details for a selected restaurant.
 * Users can browse items and add them to cart from here.
 */

import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes } from '@app/navigation/types';
import { colors, radii, shadows, spacing, typography } from '@app/theme';

import type { RestaurantDetailsScreenProps } from '@app/navigation/types';

/**
 * Mock menu items for placeholder display.
 */
const MOCK_MENU_ITEMS = [
  { id: '1', name: 'Margherita Pizza', price: 12.99, description: 'Classic tomato and mozzarella' },
  { id: '2', name: 'Pepperoni Pizza', price: 14.99, description: 'Loaded with pepperoni' },
  { id: '3', name: 'Caesar Salad', price: 8.99, description: 'Fresh romaine with caesar dressing' },
  { id: '4', name: 'Garlic Bread', price: 5.99, description: 'Toasted with garlic butter' },
  { id: '5', name: 'Tiramisu', price: 7.99, description: 'Classic Italian dessert' },
];

type MenuItem = (typeof MOCK_MENU_ITEMS)[number];

/**
 * RestaurantDetailsScreen shows the menu for a selected restaurant.
 */
export const RestaurantDetailsScreen: React.FC<RestaurantDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { restaurantName = 'Restaurant' } = route.params;

  const handleAddToCart = (_item: MenuItem) => {
    // In a real app, this would add the item to the cart
    // For now, just navigate to the cart
    navigation.navigate(Routes.CART);
  };

  const handleViewCart = () => {
    navigation.navigate(Routes.CART);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}
        accessibilityRole="button"
        accessibilityLabel={`Add ${item.name} to cart, $${item.price.toFixed(2)}`}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <Text style={styles.restaurantMeta}>Italian • $$ • 25-35 min</Text>
      </View>

      <Text style={styles.sectionTitle}>Menu</Text>

      <FlatList
        data={MOCK_MENU_ITEMS}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={handleViewCart}
          accessibilityRole="button"
          accessibilityLabel="View cart"
        >
          <Text style={styles.viewCartButtonText}>View Cart</Text>
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
  restaurantName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.text.primary,
  },
  restaurantMeta: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
    ...shadows.sm,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
  },
  menuItemDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xs,
  },
  menuItemPrice: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary.main,
    marginTop: spacing.xs,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  addButtonText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.contrast,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  viewCartButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  viewCartButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.contrast,
  },
});
