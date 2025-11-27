/**
 * Order History Screen
 *
 * Displays a list of past orders for the user to view and reorder from.
 */

import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes } from '@app/navigation/types';
import { colors, radii, shadows, spacing, typography } from '@app/theme';

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
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => handleViewOrder(item)}
      accessibilityRole="button"
      accessibilityLabel={`Order from ${item.restaurant} on ${formatDate(item.date)}, ${item.items} items, total $${item.total.toFixed(2)}`}
    >
      <View style={styles.orderHeader}>
        <View style={styles.restaurantIcon}>
          <Text style={styles.restaurantIconText}>{item.restaurant.charAt(0)}</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.restaurantName}>{item.restaurant}</Text>
          <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.orderItems}>
          {item.items} item{item.items !== 1 ? 's' : ''}
        </Text>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
      </View>

      <View style={styles.orderActions}>
        <TouchableOpacity
          style={styles.reorderButton}
          accessibilityRole="button"
          accessibilityLabel={`Reorder from ${item.restaurant}`}
        >
          <Text style={styles.reorderButtonText}>Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsButton}
          accessibilityRole="button"
          accessibilityLabel="View order details"
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order History</Text>
        <Text style={styles.headerSubtitle}>Your past orders</Text>
      </View>

      <FlatList
        data={MOCK_ORDERS}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptyText}>Your order history will appear here</Text>
          </View>
        }
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
  orderCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  restaurantIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantIconText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.contrast,
  },
  orderInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  restaurantName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
  },
  orderDate: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xs,
  },
  statusBadge: {
    backgroundColor: colors.semantic.success,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral.white,
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
  orderItems: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
  },
  orderTotal: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
  },
  orderActions: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  reorderButton: {
    flex: 1,
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  reorderButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.contrast,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: colors.neutral.background,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  detailsButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.text.secondary,
  },
});
