/**
 * Restaurant List Screen (Home)
 *
 * Displays a list of available restaurants for the user to browse.
 * This is the initial/home screen of the application.
 */

import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes } from '@app/navigation/types';
import { colors, radii, shadows, spacing, typography } from '@app/theme';

import type { RestaurantListScreenProps } from '@app/navigation/types';

/**
 * Mock restaurant data for placeholder display.
 */
const MOCK_RESTAURANTS = [
  { id: '1', name: 'Pizza Palace', cuisine: 'Italian', rating: 4.5 },
  { id: '2', name: 'Burger Barn', cuisine: 'American', rating: 4.2 },
  { id: '3', name: 'Sushi Supreme', cuisine: 'Japanese', rating: 4.8 },
  { id: '4', name: 'Taco Town', cuisine: 'Mexican', rating: 4.3 },
  { id: '5', name: 'Curry Corner', cuisine: 'Indian', rating: 4.6 },
];

type Restaurant = (typeof MOCK_RESTAURANTS)[number];

/**
 * RestaurantListScreen displays the home screen with available restaurants.
 */
export const RestaurantListScreen: React.FC<RestaurantListScreenProps> = ({ navigation }) => {
  const handleRestaurantPress = (restaurant: Restaurant) => {
    navigation.navigate(Routes.RESTAURANT_DETAILS, {
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
  };

  const renderRestaurantItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => handleRestaurantPress(item)}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.cuisine} cuisine, rated ${item.rating} stars`}
      accessibilityHint="Double tap to view restaurant menu"
    >
      <View style={styles.restaurantImagePlaceholder}>
        <Text style={styles.restaurantImageText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
        <Text style={styles.restaurantRating}>★ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Foodie</Text>
        <Text style={styles.headerSubtitle}>What would you like to eat?</Text>
      </View>

      <FlatList
        data={MOCK_RESTAURANTS}
        renderItem={renderRestaurantItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xs,
  },
  listContent: {
    padding: spacing.md,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.sm,
  },
  restaurantImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantImageText: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.contrast,
  },
  restaurantInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
  },
  restaurantCuisine: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xs,
  },
  restaurantRating: {
    fontSize: typography.fontSize.sm,
    color: colors.secondary.main,
    marginTop: spacing.xs,
    fontWeight: typography.fontWeight.medium,
  },
});
