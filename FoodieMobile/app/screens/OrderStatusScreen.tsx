/**
 * Order Status Screen
 *
 * Displays the current status of an active order,
 * including tracking information and estimated delivery time.
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radii, shadows, spacing, typography } from '@app/theme';

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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Header */}
        <View style={styles.header}>
          <Text style={styles.orderLabel}>Order</Text>
          <Text style={styles.orderId}>{orderId}</Text>
          <View style={styles.estimatedContainer}>
            <Text style={styles.estimatedLabel}>Estimated Delivery</Text>
            <Text style={styles.estimatedTime}>15-20 minutes</Text>
          </View>
        </View>

        {/* Status Timeline */}
        <View style={styles.timeline}>
          {ORDER_STEPS.map((step, index) => (
            <View key={step.id} style={styles.timelineItem}>
              <View style={styles.timelineIndicator}>
                <View
                  style={[styles.timelineDot, step.completed && styles.timelineDotCompleted]}
                  accessibilityLabel={step.completed ? 'Completed' : 'Pending'}
                >
                  {step.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                {index < ORDER_STEPS.length - 1 && (
                  <View
                    style={[styles.timelineLine, step.completed && styles.timelineLineCompleted]}
                  />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text
                  style={[styles.timelineTitle, step.completed && styles.timelineTitleCompleted]}
                >
                  {step.title}
                </Text>
                <Text style={styles.timelineDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Driver Info Placeholder */}
        <View style={styles.driverCard}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverAvatarText}>D</Text>
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>David M.</Text>
            <Text style={styles.driverVehicle}>Toyota Camry • ABC 1234</Text>
          </View>
          <View style={styles.driverActions}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Call</Text>
            </View>
          </View>
        </View>

        {/* Order Details */}
        <View style={styles.orderDetails}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Restaurant</Text>
            <Text style={styles.detailValue}>Pizza Palace</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Items</Text>
            <Text style={styles.detailValue}>3 items</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total</Text>
            <Text style={styles.detailValue}>$47.10</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  header: {
    backgroundColor: colors.primary.main,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  orderLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.contrast,
    opacity: 0.8,
  },
  orderId: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.contrast,
    marginBottom: spacing.md,
  },
  estimatedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimatedLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.contrast,
    opacity: 0.8,
  },
  estimatedTime: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.contrast,
  },
  timeline: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
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
    fontSize: 14,
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
  timelineTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.secondary,
  },
  timelineTitleCompleted: {
    color: colors.neutral.text.primary,
  },
  timelineDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xs,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: radii.full,
    backgroundColor: colors.secondary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverAvatarText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary.contrast,
  },
  driverInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  driverName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
  },
  driverVehicle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xs,
  },
  driverActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
  },
  actionButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary.contrast,
  },
  orderDetails: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
  },
  detailValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral.text.primary,
  },
});
