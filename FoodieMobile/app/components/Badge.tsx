/**
 * Badge Component
 *
 * A small status indicator component for labels and counts.
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radii, spacing } from '@app/theme';

import { Text } from './Text';

/**
 * Badge variants.
 */
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

/**
 * Badge component props.
 */
export interface BadgeProps {
  /** Badge text content */
  children: React.ReactNode;
  /** Badge variant for color styling */
  variant?: BadgeVariant;
  /** Additional style overrides */
  style?: ViewStyle;
}

/**
 * Variant color configurations.
 */
const variantColors: Record<BadgeVariant, { background: string; text: string }> = {
  default: {
    background: colors.neutral.border,
    text: colors.neutral.text.primary,
  },
  success: {
    background: colors.semantic.success,
    text: colors.neutral.white,
  },
  warning: {
    background: colors.semantic.warning,
    text: colors.neutral.text.primary,
  },
  error: {
    background: colors.semantic.error,
    text: colors.neutral.white,
  },
  info: {
    background: colors.semantic.info,
    text: colors.neutral.white,
  },
};

/**
 * Badge component for status labels and counts.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Delivered</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge>3</Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', style }) => {
  const { background, text } = variantColors[variant];

  return (
    <View style={[styles.container, { backgroundColor: background }, style]}>
      <Text variant="caption" color={text} weight="medium">
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
  },
});
