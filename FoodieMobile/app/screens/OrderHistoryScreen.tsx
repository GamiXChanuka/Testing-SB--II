/**
 * Order History Screen
 *
 * Displays a list of past orders for the user to view and reorder from.
 */

import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Avatar, Badge, Button, Card, ScreenContainer, ScreenHeader, Text } from '@app/components';
import { Routes } from '@app/navigation/types';
import { colors, spacing } from '@app/theme';

import type { OrderHistoryScreenProps } from '@app/navigation/types';

/**
 * Mock order history data.
 */
const MOCK_ORDERS = [
  {
    id: 'ORD-ABC123',
    restaurant: 'Pizza Palace',
    date: '2024-01-15',
    items: 3,
    total: 47.1,
    status: 'Delivered',
  },
  {
    id: 'ORD-DEF456',
    restaurant: 'Burger Barn',
    date: '2024-01-12',
    items: 2,
    total: 28.5,
    status: 'Delivered',
  },
  {
    id: 'ORD-GHI789',
    restaurant: 'Sushi Supreme',
    date: '2024-01-08',
    items: 4,
    total: 65.0,
    status: 'Delivered',
  },
  {
    id: 'ORD-JKL012',
    restaurant: 'Taco Town',
    date: '2024-01-05',
    items: 5,
    total: 32.75,
    status: 'Delivered',
  },
];

type Order = (typeof MOCK_ORDERS)[number];

/**
 * OrderHistoryScreen displays past orders.
 */
export const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({ navigation }) => {
  const handleViewOrder = (order: Order) => {
    navigation.navigate(Routes.ORDER_STATUS, { orderId: order.id });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <Card
      style={styles.orderCard}
      onPress={() => handleViewOrder(item)}
      accessibilityLabel={`Order from ${item.restaurant} on ${formatDate(item.date)}, ${item.items} items, total $${item.total.toFixed(2)}`}
    >
      <View style={styles.orderHeader}>
        <Avatar name={item.restaurant} />
        <View style={styles.orderInfo}>
          <Text variant="body" weight="semibold">
            {item.restaurant}
          </Text>
          <Text variant="bodySmall" color={colors.neutral.text.secondary}>
            {formatDate(item.date)}
          </Text>
        </View>
        <Badge variant="success">{item.status}</Badge>
      </View>

      <View style={styles.orderDetails}>
        <Text variant="bodySmall" color={colors.neutral.text.secondary}>
          {item.items} item{item.items !== 1 ? 's' : ''}
        </Text>
        <Text variant="body" weight="semibold">
          ${item.total.toFixed(2)}
        </Text>
      </View>

      <View style={styles.orderActions}>
        <Button
          size="small"
          style={styles.reorderButton}
          accessibilityLabel={`Reorder from ${item.restaurant}`}
        >
          Reorder
        </Button>
        <Button
          variant="outline"
          size="small"
          style={styles.detailsButton}
          accessibilityLabel="View order details"
        >
          View Details
        </Button>
      </View>
    </Card>
  );

  return (
    <ScreenContainer edges={['top']}>
      <ScreenHeader>
        <Text variant="heading">Order History</Text>
        <Text variant="bodySmall" color={colors.neutral.text.secondary} style={styles.subtitle}>
          Your past orders
        </Text>
      </ScreenHeader>

      <FlatList
        data={MOCK_ORDERS}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="subtitle" weight="semibold" style={styles.emptyTitle}>
              No orders yet
            </Text>
            <Text variant="body" color={colors.neutral.text.secondary}>
              Your order history will appear here
            </Text>
          </View>
        }
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
  orderCard: {
    marginBottom: spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  orderInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  orderActions: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  reorderButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  detailsButton: {
    flex: 1,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyTitle: {
    marginBottom: spacing.sm,
  },
});
