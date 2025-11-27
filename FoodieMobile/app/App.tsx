/**
 * Foodie Mobile Application Root Component
 *
 * This component serves as the entry point for the Foodie mobile app.
 * It composes all global providers in the correct order:
 * 1. Redux Provider (for local/app state)
 * 2. QueryProvider (for server state via React Query)
 * 3. ThemeProvider (for design system tokens)
 * 4. ErrorBoundary (for catching unhandled errors) - to be added in Step 7
 * 5. NavigationContainer (for routing) - to be added in Step 3
 */

import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';

import { analytics, AnalyticsEvents } from '@app/analytics';
import { config } from '@app/config';
import { logger } from '@app/logging';
import { QueryProvider } from '@app/query';
import { store } from '@app/store';
import { ThemeProvider, colors, spacing, typography } from '@app/theme';

/**
 * Placeholder screen component to display while navigation is being set up.
 * This will be replaced with the actual navigation container in Step 3.
 */
const PlaceholderScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foodie</Text>
      <Text style={styles.subtitle}>Your food, delivered.</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>App shell initialized successfully</Text>
        <Text style={styles.envText}>Environment: {config.environment}</Text>
      </View>
    </View>
  );
};

/**
 * Main App component that composes all providers.
 */
const App: React.FC = () => {
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
    <ReduxProvider store={store}>
      <QueryProvider>
        <ThemeProvider>
          {/* ErrorBoundary will wrap this in Step 7 */}
          {/* NavigationContainer will be added in Step 3 */}
          <PlaceholderScreen />
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

/**
 * Styles for the placeholder screen.
 * These will be replaced with proper themed components in later steps.
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
    borderRadius: 8,
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
  },
});

export default App;
