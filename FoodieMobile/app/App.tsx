/**
 * Foodie Mobile Application Root Component
 *
 * This component serves as the entry point for the Foodie mobile app.
 * It composes all global providers in the correct order:
 *
 * 1. Redux Provider - Makes store available throughout app
 * 2. QueryProvider - Server state management via React Query
 * 3. SafeAreaProvider - Safe area context for proper insets
 * 4. ThemeProvider - Design system tokens
 * 5. ErrorBoundary - Catches unhandled rendering errors
 * 6. NavigationContainer - Root navigation context
 *
 * This order ensures that:
 * - Redux is available to all components including error handling
 * - React Query is available for data fetching anywhere
 * - Safe areas are calculated before navigation renders
 * - Theme is available to error boundary and navigation
 * - Error boundary catches navigation/screen errors
 * - Navigation is the innermost wrapper around screens
 */

import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { analytics, AnalyticsEvents } from '@app/analytics';
import { ErrorBoundary } from '@app/components/ErrorBoundary';
import { config } from '@app/config';
import { logger } from '@app/logging';
import { AppNavigationContainer } from '@app/navigation';
import { QueryProvider } from '@app/query';
import { store } from '@app/store';
import { colors, radii, spacing, ThemeProvider, typography } from '@app/theme';

/**
 * Placeholder screen component displayed while full navigation is being set up.
 * This will be replaced with the actual navigation stack in Step 3.
 */
const PlaceholderScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foodie</Text>
      <Text style={styles.subtitle}>Your food, delivered.</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>App shell initialized successfully</Text>
        <Text style={styles.envText}>Environment: {config.environment}</Text>
        <Text style={styles.versionText}>Version: {config.appVersion}</Text>
      </View>
    </View>
  );
};

/**
 * Inner app component that handles initialization side effects.
 * Separated from the main App to ensure providers are available.
 */
const AppContent: React.FC = () => {
  useEffect(() => {
    // Log app initialization
    logger.info('Foodie app starting', {
      version: config.appVersion,
      environment: config.environment,
    });

    // Track app open event
    analytics.trackEvent(AnalyticsEvents.APP_OPEN, {
      version: config.appVersion,
    });
  }, []);

  return (
    <AppNavigationContainer>
      {/* Navigation stack will be added in Step 3 */}
      <PlaceholderScreen />
    </AppNavigationContainer>
  );
};

/**
 * Handle error boundary reset by logging the recovery attempt.
 */
const handleErrorReset = (): void => {
  logger.info('User initiated error recovery');
};

/**
 * Main App component that composes all global providers.
 *
 * Provider composition order (outermost to innermost):
 * ReduxProvider → QueryProvider → SafeAreaProvider → ThemeProvider → ErrorBoundary → NavigationContainer
 */
const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <ErrorBoundary onReset={handleErrorReset}>
              <AppContent />
            </ErrorBoundary>
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

/**
 * Styles for the placeholder screen.
 * These use theme tokens directly for consistency.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.neutral.text.secondary,
    marginBottom: spacing.xl,
  },
  infoContainer: {
    backgroundColor: colors.neutral.surface,
    padding: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  infoText: {
    fontSize: typography.fontSize.base,
    color: colors.semantic.success,
    marginBottom: spacing.xs,
  },
  envText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginBottom: spacing.xs,
  },
  versionText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.disabled,
  },
});

export default App;
