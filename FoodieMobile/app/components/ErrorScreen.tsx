/**
 * Generic Error Screen Component
 *
 * Displays a user-friendly error message when an unhandled error occurs.
 * Uses shared components from the design system for consistent styling.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '@app/theme';

import { Button } from './Button';
import { ScreenContainer } from './ScreenContainer';
import { Text } from './Text';

/**
 * Props for the ErrorScreen component.
 */
export interface ErrorScreenProps {
  /** The error that occurred (used for development info, not shown to user) */
  error?: Error | null;
  /** Callback when the user taps the retry button */
  onRetry?: () => void;
  /** Callback when the user taps the go home button */
  onGoHome?: () => void;
  /** Optional custom title */
  title?: string;
  /** Optional custom message */
  message?: string;
  /** Whether to show the Go Home button */
  showHomeButton?: boolean;
}

/**
 * ErrorScreen displays a friendly error message to users when something goes wrong.
 *
 * This screen is designed to be:
 * - User-friendly (no technical jargon)
 * - Accessible (proper labels and roles)
 * - Consistent with the app's design system
 * - Recoverable (provides retry and navigation actions)
 *
 * @example
 * ```tsx
 * <ErrorScreen
 *   onRetry={() => resetErrorBoundary()}
 *   onGoHome={() => navigation.reset({ routes: [{ name: 'Home' }] })}
 *   showHomeButton
 * />
 * ```
 */
export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  error: _error,
  onRetry,
  onGoHome,
  title = 'Oops! Something went wrong',
  message = "We're sorry, but something unexpected happened. Please try again.",
  showHomeButton = true,
}) => {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        {/* Error Icon */}
        <View style={styles.iconContainer}>
          <Text variant="heading" style={styles.iconText}>
            !
          </Text>
        </View>

        {/* Error Title */}
        <Text variant="heading" align="center" style={styles.title} accessibilityRole="header">
          {title}
        </Text>

        {/* Error Message */}
        <Text
          variant="body"
          color={colors.neutral.text.secondary}
          align="center"
          style={styles.message}
        >
          {message}
        </Text>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {/* Retry Button */}
          {onRetry && (
            <Button
              fullWidth
              onPress={onRetry}
              style={styles.retryButton}
              accessibilityLabel="Try again"
              accessibilityHint="Attempts to recover from the error"
            >
              Try Again
            </Button>
          )}

          {/* Go Home Button */}
          {showHomeButton && onGoHome && (
            <Button
              variant="outline"
              fullWidth
              onPress={onGoHome}
              style={styles.homeButton}
              accessibilityLabel="Go to home screen"
              accessibilityHint="Returns to the restaurant list"
            >
              Go to Home
            </Button>
          )}
        </View>

        {/* Secondary hint */}
        <Text
          variant="caption"
          color={colors.neutral.text.disabled}
          align="center"
          style={styles.hint}
        >
          If the problem persists, please restart the app.
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
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
    color: colors.neutral.white,
  },
  title: {
    marginBottom: spacing.md,
  },
  message: {
    marginBottom: spacing.xl,
  },
  actions: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  retryButton: {
    marginBottom: spacing.md,
  },
  homeButton: {
    marginBottom: spacing.sm,
  },
  hint: {
    paddingHorizontal: spacing.lg,
  },
});
