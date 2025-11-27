/**
 * Order Status Screen
 *
 * Displays the current status of an active order,
 * including tracking information and estimated delivery time.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Avatar, Button, Card, ScreenContainer, Text } from '@app/components';
import { colors, radii, spacing } from '@app/theme';

import type { OrderStatusScreenProps } from '@app/navigation/types';

/**
 * Mock order status steps.
 */
const ORDER_STEPS = [
  { id: '1', title: 'Order Placed', description: 'Your order has been received', completed: true },
  {
    id: '2',
    title: 'Preparing',
    description: 'Restaurant is preparing your food',
    completed: true,
  },
  {
    id: '3',
    title: 'Ready for Pickup',
    description: 'Driver is on the way to the restaurant',
    completed: false,
  },
  { id: '4', title: 'On the Way', description: 'Driver is heading to you', completed: false },
  { id: '5', title: 'Delivered', description: 'Enjoy your meal!', completed: false },
];

/**
 * OrderStatusScreen shows real-time order tracking.
 */
export const OrderStatusScreen: React.FC<OrderStatusScreenProps> = ({ route }) => {
  const { orderId } = route.params;

  return (
    <ScreenContainer scroll edges={['bottom']}>
      {/* Order Header */}
      <View style={styles.header}>
        <Text variant="bodySmall" style={styles.orderLabel}>
          Order
        </Text>
        <Text variant="title" weight="bold" style={styles.orderId}>
          {orderId}
        </Text>
        <View style={styles.estimatedContainer}>
          <Text variant="bodySmall" style={styles.estimatedLabel}>
            Estimated Delivery
          </Text>
          <Text variant="subtitle" weight="bold" style={styles.estimatedTime}>
            15-20 minutes
          </Text>
        </View>
      </View>

      {/* Status Timeline */}
      <Card style={styles.timeline}>
        {ORDER_STEPS.map((step, index) => (
          <View key={step.id} style={styles.timelineItem}>
            <View style={styles.timelineIndicator}>
              <View
                style={[styles.timelineDot, step.completed && styles.timelineDotCompleted]}
                accessibilityLabel={step.completed ? 'Completed' : 'Pending'}
              >
                {step.completed && (
                  <Text variant="caption" style={styles.checkmark}>
                    ✓
                  </Text>
                )}
              </View>
              {index < ORDER_STEPS.length - 1 && (
                <View
                  style={[styles.timelineLine, step.completed && styles.timelineLineCompleted]}
                />
              )}
            </View>
            <View style={styles.timelineContent}>
              <Text
                variant="body"
                weight="semibold"
                color={step.completed ? colors.neutral.text.primary : colors.neutral.text.secondary}
              >
                {step.title}
              </Text>
              <Text
                variant="bodySmall"
                color={colors.neutral.text.secondary}
                style={styles.timelineDescription}
              >
                {step.description}
              </Text>
            </View>
          </View>
        ))}
      </Card>

      {/* Driver Info */}
      <Card style={styles.driverCard}>
        <View style={styles.driverCardContent}>
          <Avatar name="David M." size={50} />
          <View style={styles.driverInfo}>
            <Text variant="body" weight="semibold">
              David M.
            </Text>
            <Text variant="bodySmall" color={colors.neutral.text.secondary}>
              Toyota Camry • ABC 1234
            </Text>
          </View>
          <Button size="small" onPress={() => {}}>
            Call
          </Button>
        </View>
      </Card>

      {/* Order Details */}
      <Card style={styles.orderDetails}>
        <Text variant="subtitle" weight="semibold" style={styles.sectionTitle}>
          Order Details
        </Text>
        <View style={styles.detailRow}>
          <Text variant="bodySmall" color={colors.neutral.text.secondary}>
            Restaurant
          </Text>
          <Text variant="bodySmall" weight="medium">
            Pizza Palace
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text variant="bodySmall" color={colors.neutral.text.secondary}>
            Items
          </Text>
          <Text variant="bodySmall" weight="medium">
            3 items
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text variant="bodySmall" color={colors.neutral.text.secondary}>
            Total
          </Text>
          <Text variant="bodySmall" weight="medium">
            $47.10
          </Text>
        </View>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary.main,
    borderRadius: radii.lg,
    padding: spacing.lg,
    margin: spacing.md,
  },
  orderLabel: {
    color: colors.primary.contrast,
    opacity: 0.8,
  },
  orderId: {
    color: colors.primary.contrast,
    marginBottom: spacing.md,
  },
  estimatedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimatedLabel: {
    color: colors.primary.contrast,
    opacity: 0.8,
  },
  estimatedTime: {
    color: colors.primary.contrast,
  },
  timeline: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineIndicator: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: radii.full,
    backgroundColor: colors.neutral.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotCompleted: {
    backgroundColor: colors.semantic.success,
  },
  checkmark: {
    color: colors.neutral.white,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: colors.neutral.border,
  },
  timelineLineCompleted: {
    backgroundColor: colors.semantic.success,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  timelineDescription: {
    marginTop: spacing.xs,
  },
  driverCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  driverCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  orderDetails: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
});
