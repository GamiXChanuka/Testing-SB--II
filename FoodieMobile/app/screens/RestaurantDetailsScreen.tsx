/**
 * Restaurant Details Screen
 *
 * Displays the menu and details for a selected restaurant.
 * Users can browse items and add them to cart from here.
 */

import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { Button, Card, ScreenContainer, ScreenFooter, ScreenHeader, Text } from '@app/components';
import { Routes } from '@app/navigation/types';
import { colors, radii, spacing } from '@app/theme';

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
    <Card style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <Text variant="body" weight="semibold">
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.description}>
            {item.description}
          </Text>
          <Text variant="body" weight="medium" color={colors.primary.main}>
            ${item.price.toFixed(2)}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
          onPress={() => handleAddToCart(item)}
          accessibilityRole="button"
          accessibilityLabel={`Add ${item.name} to cart, $${item.price.toFixed(2)}`}
        >
          <Text variant="title" color={colors.primary.contrast}>
            +
          </Text>
        </Pressable>
      </View>
    </Card>
  );

  return (
    <ScreenContainer edges={['bottom']}>
      <ScreenHeader>
        <Text variant="heading">{restaurantName}</Text>
        <Text variant="bodySmall" style={styles.meta}>
          Italian • $$ • 25-35 min
        </Text>
      </ScreenHeader>

      <Text variant="title" style={styles.sectionTitle}>
        Menu
      </Text>

      <FlatList
        data={MOCK_MENU_ITEMS}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <ScreenFooter>
        <Button fullWidth onPress={handleViewCart}>
          View Cart
        </Button>
      </ScreenFooter>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  meta: {
    marginTop: spacing.xs,
  },
  sectionTitle: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  menuItem: {
    marginBottom: spacing.sm,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemInfo: {
    flex: 1,
  },
  description: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
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
  addButtonPressed: {
    backgroundColor: colors.primary.dark,
  },
});
