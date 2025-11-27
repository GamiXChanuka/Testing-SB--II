/**
 * ListItem Component
 *
 * A versatile list item component for displaying items in lists.
 * Supports left/right elements, titles, subtitles, and press handlers.
 */

import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radii, spacing } from '@app/theme';

import { Text } from './Text';

/**
 * ListItem component props.
 */
export interface ListItemProps {
  /** Primary text */
  title: string;
  /** Secondary text */
  subtitle?: string;
  /** Element to display on the left (icon, avatar, etc.) */
  leftElement?: React.ReactNode;
  /** Element to display on the right (chevron, badge, etc.) */
  rightElement?: React.ReactNode;
  /** Press handler */
  onPress?: () => void;
  /** Show chevron indicator on the right */
  showChevron?: boolean;
  /** Whether this is the last item (hides bottom border) */
  isLast?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
}

/**
 * Default chevron element.
 */
const ChevronRight: React.FC = () => (
  <Text variant="body" color={colors.neutral.text.disabled} style={styles.chevron}>
    ›
  </Text>
);

/**
 * ListItem component for lists and menus.
 *
 * @example
 * ```tsx
 * <ListItem
 *   title="Profile Settings"
 *   subtitle="Manage your account"
 *   leftElement={<Icon name="user" />}
 *   showChevron
 *   onPress={handlePress}
 * />
 * ```
 */
export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftElement,
  rightElement,
  onPress,
  showChevron = false,
  isLast = false,
  style,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const containerStyle: ViewStyle[] = [styles.container, !isLast && styles.bordered, style].filter(
    Boolean
  ) as ViewStyle[];

  const content = (
    <>
      {leftElement && <View style={styles.leftElement}>{leftElement}</View>}

      <View style={styles.content}>
        <Text variant="body" weight="medium" numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="bodySmall" numberOfLines={2} style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>

      {(rightElement || showChevron) && (
        <View style={styles.rightElement}>
          {rightElement}
          {showChevron && <ChevronRight />}
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [...containerStyle, pressed && styles.pressed]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityHint={accessibilityHint}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{content}</View>;
};

/**
 * ListItemSeparator component for visual separation between items.
 */
export const ListItemSeparator: React.FC<{ inset?: boolean }> = ({ inset = false }) => (
  <View style={[styles.separator, inset && styles.separatorInset]} />
);

/**
 * ListItemGroup component for grouping related list items.
 */
export const ListItemGroup: React.FC<{
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ title, children, style }) => (
  <View style={[styles.group, style]}>
    {title && (
      <Text variant="label" style={styles.groupTitle}>
        {title.toUpperCase()}
      </Text>
    )}
    <View style={styles.groupContent}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.neutral.surface,
    minHeight: 56,
  },
  bordered: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  pressed: {
    backgroundColor: colors.neutral.background,
  },
  leftElement: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 2,
  },
  rightElement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  chevron: {
    fontSize: 24,
    marginLeft: spacing.xs,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral.border,
  },
  separatorInset: {
    marginLeft: spacing.lg + spacing.md + 36, // Account for left element
  },
  group: {
    marginBottom: spacing.lg,
  },
  groupTitle: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  groupContent: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
});
