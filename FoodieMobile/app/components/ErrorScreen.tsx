/**
 * Generic Error Screen Component
 *
 * Displays a user-friendly error message when an unhandled error occurs.
 * Uses the design system tokens for consistent styling.
 */

import React from 'react';
import { AccessibilityRole, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radii, spacing, typography } from '@app/theme';

/**
 * Props for the ErrorScreen component.
 */
export interface ErrorScreenProps {
  /** The error that occurred (used for development info, not shown to user) */
  error?: Error | null;
  /** Callback when the user taps the retry button */
  onRetry?: () => void;
  /** Optional custom title */
  title?: string;
  /** Optional custom message */
  message?: string;
}

/**
 * ErrorScreen displays a friendly error message to users when something goes wrong.
 *
 * This screen is designed to be:
 * - User-friendly (no technical jargon)
 * - Accessible (proper labels and roles)
 * - Consistent with the app's design system
 * - Recoverable (provides a retry action)
 */
export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  error: _error,
  onRetry,
  title = 'Oops! Something went wrong',
  message = "We're sorry, but something unexpected happened. Please try again.",
}) => {
  const retryButtonRole: AccessibilityRole = 'button';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Error Icon Placeholder */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>!</Text>
        </View>

        {/* Error Title */}
        <Text style={styles.title} accessibilityRole="header" accessibilityLabel={title}>
          {title}
        </Text>

        {/* Error Message */}
        <Text style={styles.message} accessibilityLabel={message}>
          {message}
        </Text>

        {/* Retry Button */}
        {onRetry && (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={onRetry}
            accessibilityRole={retryButtonRole}
            accessibilityLabel="Try again"
            accessibilityHint="Attempts to recover from the error"
            activeOpacity={0.8}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        )}

        {/* Secondary action hint */}
        <Text style={styles.hint}>If the problem persists, please restart the app.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: radii.full,
    backgroundColor: colors.semantic.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconText: {
    fontSize: 48,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.white,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  message: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    color: colors.neutral.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  retryButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.md,
    marginBottom: spacing.lg,
    minWidth: 200,
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.contrast,
  },
  hint: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.disabled,
    textAlign: 'center',
  },
});
