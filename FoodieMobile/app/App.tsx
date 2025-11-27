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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { analytics, AnalyticsEvents } from '@app/analytics';
import { ErrorBoundary } from '@app/components/ErrorBoundary';
import { config } from '@app/config';
import { logger } from '@app/logging';
import { AppNavigationContainer, RootNavigator } from '@app/navigation';
import { QueryProvider } from '@app/query';
import { store } from '@app/store';
import { ThemeProvider } from '@app/theme';

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
      <RootNavigator />
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

export default App;
