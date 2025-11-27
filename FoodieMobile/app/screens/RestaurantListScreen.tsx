/**
 * Restaurant List Screen (Home)
 *
 * Displays a list of available restaurants for the user to browse.
 * This is the initial/home screen of the application.
 */

import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Avatar, Card, ScreenContainer, ScreenHeader, Text } from '@app/components';
import { Routes } from '@app/navigation/types';
import { colors, spacing } from '@app/theme';

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
    <Card
      onPress={() => handleRestaurantPress(item)}
      padding="none"
      style={styles.restaurantCard}
      accessibilityLabel={`${item.name}, ${item.cuisine} cuisine, rated ${item.rating} stars`}
      accessibilityHint="Double tap to view restaurant menu"
    >
      <View style={styles.cardContent}>
        <Avatar
          name={item.name}
          size={80}
          backgroundColor={colors.primary.light}
          style={styles.avatar}
        />
        <View style={styles.restaurantInfo}>
          <Text variant="title" numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.cuisine}>
            {item.cuisine}
          </Text>
          <Text variant="bodySmall" color={colors.secondary.main} weight="medium">
            ★ {item.rating}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <ScreenContainer edges={['top']}>
      <ScreenHeader>
        <Text variant="heading" color={colors.primary.main}>
          Foodie
        </Text>
        <Text variant="body" color={colors.neutral.text.secondary} style={styles.subtitle}>
          What would you like to eat?
        </Text>
      </ScreenHeader>

      <FlatList
        data={MOCK_RESTAURANTS}
        renderItem={renderRestaurantItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  restaurantCard: {
    marginBottom: spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 0,
  },
  restaurantInfo: {
    flex: 1,
    padding: spacing.md,
  },
  cuisine: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
});
