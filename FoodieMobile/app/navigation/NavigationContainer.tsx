/**
 * App Navigation Container
 *
 * Wraps the entire navigation tree with React Navigation's NavigationContainer.
 * Handles navigation state changes for analytics tracking and theme integration.
 */

import {
  DefaultTheme,
  NavigationContainer as RNNavigationContainer,
  NavigationState,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import React, { ReactNode, useCallback, useRef } from 'react';

import { analytics } from '@app/analytics';
import { logger } from '@app/logging';
import { colors } from '@app/theme';

/**
 * Props for the AppNavigationContainer component.
 */
interface AppNavigationContainerProps {
  /** Child components (navigation structure) */
  children: ReactNode;
}

/**
 * Navigation theme that maps our design tokens to React Navigation's theme format.
 */
const navigationTheme: NavigationTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary.main,
    background: colors.neutral.background,
    card: colors.neutral.surface,
    text: colors.neutral.text.primary,
    border: colors.neutral.border,
    notification: colors.semantic.error,
  },
};

/**
 * Get the active route name from navigation state.
 * Recursively traverses nested navigators to find the current screen.
 */
const getActiveRouteName = (state: NavigationState | undefined): string | undefined => {
  if (!state) {
    return undefined;
  }

  const route = state.routes[state.index];

  // If the route has nested state, recurse into it
  if (route?.state) {
    return getActiveRouteName(route.state as NavigationState);
  }

  return route?.name;
};

/**
 * AppNavigationContainer wraps the app's navigation structure.
 *
 * Responsibilities:
 * - Provides React Navigation context
 * - Applies navigation theme from design system
 * - Tracks screen views for analytics
 * - Logs navigation state changes in development
 */
export const AppNavigationContainer: React.FC<AppNavigationContainerProps> = ({ children }) => {
  // Track the current route for comparison
  const routeNameRef = useRef<string | undefined>(undefined);

  /**
   * Handle navigation state changes.
   * Called whenever the navigation state updates.
   */
  const handleStateChange = useCallback((state: NavigationState | undefined) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    // Only track if the route actually changed
    if (previousRouteName !== currentRouteName && currentRouteName) {
      // Log navigation for debugging
      logger.debug('Navigation state changed', {
        from: previousRouteName,
        to: currentRouteName,
      });

      // Track screen view in analytics
      analytics.trackScreenView(currentRouteName, {
        previousScreen: previousRouteName,
      });
    }

    // Update the ref with current route
    routeNameRef.current = currentRouteName;
  }, []);

  /**
   * Handle when navigation container is ready.
   * Used to capture the initial route.
   */
  const handleReady = useCallback(() => {
    logger.info('Navigation container ready');
  }, []);

  return (
    <RNNavigationContainer
      theme={navigationTheme}
      onStateChange={handleStateChange}
      onReady={handleReady}
    >
      {children}
    </RNNavigationContainer>
  );
};
