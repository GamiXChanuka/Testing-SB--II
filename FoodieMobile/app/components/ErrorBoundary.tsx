/**
 * Global Error Boundary Component
 *
 * Catches JavaScript errors in the component tree below it,
 * logs the error with full details for crash reporting integration,
 * and displays a fallback UI instead of crashing.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

import { analytics, AnalyticsEvents, AnalyticsScreens } from '@app/analytics';
import { logger } from '@app/logging';

import { ErrorScreen } from './ErrorScreen';

/**
 * Props for the ErrorBoundary component.
 */
export interface ErrorBoundaryProps {
  /** Child components to render */
  children: ReactNode;
  /** Optional custom fallback component */
  fallback?: ReactNode;
  /** Optional callback when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Optional callback for reset/recovery action */
  onReset?: () => void;
  /** Optional callback to navigate to home screen */
  onNavigateHome?: () => void;
}

/**
 * State for the ErrorBoundary component.
 */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The error that was caught, if any */
  error: Error | null;
  /** Unique identifier for this error occurrence */
  errorId: string | null;
}

/**
 * Generate a unique error ID for tracking.
 */
const generateErrorId = (): string => {
  return `err_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * ErrorBoundary component that catches rendering errors in its children.
 *
 * This must be a class component because error boundaries require
 * the componentDidCatch and getDerivedStateFromError lifecycle methods.
 *
 * Features:
 * - Catches all rendering errors in the component tree
 * - Logs errors with structured context for crash reporting
 * - Tracks errors in analytics
 * - Displays a user-friendly error screen
 * - Provides retry and navigate home recovery options
 *
 * @example
 * ```tsx
 * <ErrorBoundary
 *   onReset={() => logger.info('Error boundary reset')}
 *   onNavigateHome={() => navigationRef.reset({ routes: [{ name: 'Home' }] })}
 * >
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
    };
  }

  /**
   * Update state when an error is thrown.
   * This lifecycle method is called during the "render" phase.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorId: generateErrorId(),
    };
  }

  /**
   * Log the error and perform side effects.
   * This lifecycle method is called during the "commit" phase.
   *
   * Logs comprehensive error details that can be integrated with
   * crash reporting tools (e.g., Sentry, Crashlytics).
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { errorId } = this.state;

    // Log the error using the central logger with full context
    // This provides structured data for crash reporting integration
    logger.error('Unhandled error caught by ErrorBoundary', error, {
      errorId,
      errorName: error.name,
      errorMessage: error.message,
      componentStack: errorInfo.componentStack,
      // Include stack trace for debugging
      stackTrace: error.stack,
    });

    // Track the error event for analytics
    // Note: We don't include full stack traces in analytics to avoid
    // sensitive data exposure and excessive payload sizes
    analytics.trackEvent(AnalyticsEvents.ERROR_OCCURRED, {
      errorId: errorId ?? undefined,
      errorName: error.name,
      errorMessage: error.message.substring(0, 100), // Truncate for analytics
      isFatal: true,
    });

    // Track error screen view
    analytics.trackScreenView(AnalyticsScreens.ERROR, {
      errorId: errorId ?? undefined,
    });

    // Call optional error callback for custom handling
    this.props.onError?.(error, errorInfo);
  }

  /**
   * Reset the error state to allow recovery.
   * Called when user taps "Try Again".
   */
  handleReset = (): void => {
    const { errorId } = this.state;

    logger.info('User initiated error recovery', {
      errorId,
      action: 'retry',
    });

    this.setState({
      hasError: false,
      error: null,
      errorId: null,
    });

    // Call optional reset callback
    this.props.onReset?.();
  };

  /**
   * Navigate to home screen as recovery action.
   * Called when user taps "Go to Home".
   */
  handleNavigateHome = (): void => {
    const { errorId } = this.state;

    logger.info('User initiated navigation to home after error', {
      errorId,
      action: 'navigate_home',
    });

    // Reset error state first
    this.setState({
      hasError: false,
      error: null,
      errorId: null,
    });

    // Then navigate home
    this.props.onNavigateHome?.();
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback, onNavigateHome } = this.props;

    if (hasError) {
      // Render custom fallback if provided, otherwise use default ErrorScreen
      if (fallback) {
        return fallback;
      }

      return (
        <ErrorScreen
          error={error}
          onRetry={this.handleReset}
          onGoHome={onNavigateHome ? this.handleNavigateHome : undefined}
          showHomeButton={!!onNavigateHome}
        />
      );
    }

    return children;
  }
}
