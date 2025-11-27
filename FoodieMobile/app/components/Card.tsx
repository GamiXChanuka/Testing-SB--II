/**
 * Card Component
 *
 * A themed container component for grouping related content.
 * Supports interactive (pressable) and static modes.
 */

import React from 'react';
import { Pressable, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { colors, radii, shadows, spacing } from '@app/theme';

/**
 * Padding size options.
 */
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

/**
 * Card component props.
 */
export interface CardProps extends Omit<ViewProps, 'style'> {
  /** Press handler - if provided, card becomes pressable */
  onPress?: () => void;
  /** Padding size */
  padding?: CardPadding;
  /** Whether to show shadow */
  shadow?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
  /** Children content */
  children: React.ReactNode;
  /** Accessibility label for pressable cards */
  accessibilityLabel?: string;
  /** Accessibility hint for pressable cards */
  accessibilityHint?: string;
}

/**
 * Padding size mapping.
 */
const paddingMap: Record<CardPadding, number> = {
  none: 0,
  small: spacing.sm,
  medium: spacing.md,
  large: spacing.lg,
};

/**
 * Card component for content grouping.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Text variant="title">Card Title</Text>
 *   <Text variant="body">Card content goes here.</Text>
 * </Card>
 *
 * <Card onPress={handlePress} accessibilityLabel="Tap to view details">
 *   <Text>Interactive Card</Text>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  onPress,
  padding = 'medium',
  shadow = true,
  style,
  children,
  accessibilityLabel,
  accessibilityHint,
  ...props
}) => {
  const cardStyle: ViewStyle = {
    ...styles.container,
    padding: paddingMap[padding],
    ...(shadow && shadows.sm),
    ...style,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

/**
 * Card.Header component for card headers.
 */
export const CardHeader: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => <View style={[styles.header, style]}>{children}</View>;

/**
 * Card.Content component for main card content.
 */
export const CardContent: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => <View style={[styles.content, style]}>{children}</View>;

/**
 * Card.Footer component for card footers.
 */
export const CardFooter: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => <View style={[styles.footer, style]}>{children}</View>;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: colors.neutral.background,
  },
  header: {
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
    marginBottom: spacing.sm,
  },
  content: {
    // Default content styles
  },
  footer: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    marginTop: spacing.sm,
  },
});
