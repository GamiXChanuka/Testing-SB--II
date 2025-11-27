/**
 * ScreenContainer Component
 *
 * A wrapper component for screens that handles safe areas,
 * consistent background colors, and optional scrolling.
 */

import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

import { colors, spacing } from '@app/theme';

/**
 * ScreenContainer component props.
 */
export interface ScreenContainerProps {
  /** Whether content should be scrollable */
  scroll?: boolean;
  /** Safe area edges to apply */
  edges?: Edge[];
  /** Whether to apply horizontal padding */
  padded?: boolean;
  /** Background color override */
  backgroundColor?: string;
  /** Additional style for the container */
  style?: ViewStyle;
  /** Additional style for the content wrapper */
  contentStyle?: ViewStyle;
  /** ScrollView props when scroll is enabled */
  scrollViewProps?: Omit<ScrollViewProps, 'style' | 'contentContainerStyle'>;
  /** Children content */
  children: React.ReactNode;
}

/**
 * ScreenContainer provides a consistent wrapper for all screens.
 *
 * @example
 * ```tsx
 * // Basic screen with safe areas
 * <ScreenContainer>
 *   <Text>Screen content</Text>
 * </ScreenContainer>
 *
 * // Scrollable screen with padding
 * <ScreenContainer scroll padded>
 *   <Text>Scrollable content</Text>
 * </ScreenContainer>
 *
 * // Screen with custom edges
 * <ScreenContainer edges={['top']}>
 *   <Text>Only top safe area</Text>
 * </ScreenContainer>
 * ```
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  scroll = false,
  edges = ['top', 'bottom'],
  padded = false,
  backgroundColor = colors.neutral.background,
  style,
  contentStyle,
  scrollViewProps,
  children,
}) => {
  const containerStyle: ViewStyle = {
    ...styles.container,
    backgroundColor,
    ...style,
  };

  const innerContentStyle: ViewStyle = {
    ...styles.content,
    ...(padded && styles.padded),
    ...contentStyle,
  };

  const content = scroll ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.scrollContent, padded && styles.padded, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={innerContentStyle}>{children}</View>
  );

  return (
    <SafeAreaView style={containerStyle} edges={edges}>
      {content}
    </SafeAreaView>
  );
};

/**
 * ScreenHeader component for consistent screen headers.
 */
export const ScreenHeader: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
  bordered?: boolean;
}> = ({ children, style, bordered = true }) => (
  <View style={[styles.header, bordered && styles.headerBordered, style]}>{children}</View>
);

/**
 * ScreenFooter component for consistent screen footers.
 */
export const ScreenFooter: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
  bordered?: boolean;
}> = ({ children, style, bordered = true }) => (
  <View style={[styles.footer, bordered && styles.footerBordered, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral.surface,
  },
  headerBordered: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.neutral.surface,
  },
  footerBordered: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
});
