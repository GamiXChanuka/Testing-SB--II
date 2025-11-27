/**
 * Global Error Boundary Component
 *
 * Catches JavaScript errors in the component tree below it,
 * logs the error, and displays a fallback UI instead of crashing.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

import { analytics, AnalyticsEvents } from '@app/analytics';
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
}

/**
 * State for the ErrorBoundary component.
 */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The error that was caught, if any */
  error: Error | null;
}

/**
 * ErrorBoundary component that catches rendering errors in its children.
 *
 * This must be a class component because error boundaries require
 * the componentDidCatch and getDerivedStateFromError lifecycle methods.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
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
    };
  }

  /**
   * Log the error and perform side effects.
   * This lifecycle method is called during the "commit" phase.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error using the central logger
    logger.error('Unhandled error caught by ErrorBoundary', error, {
      componentStack: errorInfo.componentStack,
    });

    // Track the error event for analytics
    analytics.trackEvent(AnalyticsEvents.ERROR_OCCURRED, {
      errorName: error.name,
      errorMessage: error.message,
      isFatal: true,
    });

    // Call optional error callback
    this.props.onError?.(error, errorInfo);
  }

  /**
   * Reset the error state to allow recovery.
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });

    // Call optional reset callback
    this.props.onReset?.();
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Render custom fallback if provided, otherwise use default ErrorScreen
      if (fallback) {
        return fallback;
      }

      return <ErrorScreen error={error} onRetry={this.handleReset} />;
    }

    return children;
  }
}
