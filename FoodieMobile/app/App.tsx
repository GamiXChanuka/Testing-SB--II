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

import { NavigationContainerRef } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { analytics, AnalyticsEvents } from '@app/analytics';
import { ErrorBoundary } from '@app/components/ErrorBoundary';
import { config } from '@app/config';
import { logger } from '@app/logging';
import { AppNavigationContainer, RootNavigator } from '@app/navigation';
import { RootTabParamList, Routes } from '@app/navigation/types';
import { QueryProvider } from '@app/query';
import { store } from '@app/store';
import { ThemeProvider } from '@app/theme';

/**
 * Navigation ref for programmatic navigation from outside components.
 * Used by error boundary to reset navigation to home on recovery.
 */
type NavigationRef = NavigationContainerRef<RootTabParamList>;

/**
 * Inner app component that handles initialization side effects.
 * Separated from the main App to ensure providers are available.
 */
interface AppContentProps {
  navigationRef: React.RefObject<NavigationRef>;
}

const AppContent: React.FC<AppContentProps> = ({ navigationRef }) => {
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
    <AppNavigationContainer ref={navigationRef}>
      <RootNavigator />
    </AppNavigationContainer>
  );
};

/**
 * Main App component that composes all global providers.
 *
 * Provider composition order (outermost to innermost):
 * ReduxProvider → QueryProvider → SafeAreaProvider → ThemeProvider → ErrorBoundary → NavigationContainer
 */
const App: React.FC = () => {
  // Navigation ref for programmatic navigation from error recovery
  const navigationRef = useRef<NavigationRef>(null);

  /**
   * Handle error boundary reset by logging the recovery attempt.
   */
  const handleErrorReset = useCallback((): void => {
    logger.info('Error boundary reset completed');
  }, []);

  /**
   * Handle navigation to home screen after an error.
   * Resets the navigation state to the Restaurant List screen.
   */
  const handleNavigateHome = useCallback((): void => {
    if (navigationRef.current?.isReady()) {
      logger.info('Navigating to home screen after error recovery');

      // Reset navigation to the home tab with restaurant list
      navigationRef.current.reset({
        index: 0,
        routes: [
          {
            name: Routes.HOME_TAB,
            state: {
              routes: [{ name: Routes.RESTAURANT_LIST }],
            },
          },
        ],
      });
    } else {
      logger.warn('Navigation not ready for home navigation after error');
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <ErrorBoundary onReset={handleErrorReset} onNavigateHome={handleNavigateHome}>
              <AppContent navigationRef={navigationRef} />
            </ErrorBoundary>
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

export default App;
