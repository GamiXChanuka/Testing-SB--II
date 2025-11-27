/**
 * Centralized logging utility for the Foodie application.
 * Provides structured logging with levels, context, and filtering capabilities.
 */

import { config } from '@app/config';

/**
 * Log levels supported by the logger.
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Context object that can be attached to log entries.
 */
export type LogContext = Record<string, unknown>;

/**
 * Structure of a log entry.
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  stack?: string;
}

/**
 * Logger interface for consistent logging across the application.
 */
export interface Logger {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, error?: Error | unknown, context?: LogContext) => void;
}

/**
 * Numeric values for log levels for comparison.
 */
const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Minimum log level based on environment.
 */
const getMinLogLevel = (): LogLevel => {
  if (config.enableDebugLogging) {
    return 'debug';
  }
  return 'warn';
};

/**
 * Check if a log level should be output based on minimum level.
 */
const shouldLog = (level: LogLevel): boolean => {
  const minLevel = getMinLogLevel();
  return LOG_LEVEL_VALUES[level] >= LOG_LEVEL_VALUES[minLevel];
};

/**
 * Format a log entry for console output.
 */
const formatLogEntry = (entry: LogEntry): string => {
  const parts = [`[${entry.timestamp}]`, `[${entry.level.toUpperCase()}]`, entry.message];

  if (entry.context && Object.keys(entry.context).length > 0) {
    parts.push(JSON.stringify(entry.context));
  }

  return parts.join(' ');
};

/**
 * Create a log entry object.
 */
const createLogEntry = (
  level: LogLevel,
  message: string,
  context?: LogContext,
  stack?: string
): LogEntry => ({
  level,
  message,
  timestamp: new Date().toISOString(),
  context,
  stack,
});

/**
 * Output log entry to appropriate console method.
 */
const outputLog = (entry: LogEntry): void => {
  const formattedMessage = formatLogEntry(entry);

  switch (entry.level) {
    case 'debug':
    case 'info':
      // Using console.info for info/debug to avoid lint warnings
      // eslint-disable-next-line no-console
      console.info(formattedMessage);
      break;
    case 'warn':
      console.warn(formattedMessage);
      break;
    case 'error':
      console.error(formattedMessage);
      if (entry.stack) {
        console.error(entry.stack);
      }
      break;
  }
};

/**
 * Extract error information from various error types.
 */
const extractErrorInfo = (error: Error | unknown): { message: string; stack?: string } => {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
    };
  }

  if (typeof error === 'string') {
    return { message: error };
  }

  return { message: String(error) };
};

/**
 * Create the logger instance.
 */
const createLogger = (): Logger => ({
  debug: (message: string, context?: LogContext): void => {
    if (!shouldLog('debug')) {
      return;
    }
    const entry = createLogEntry('debug', message, context);
    outputLog(entry);
  },

  info: (message: string, context?: LogContext): void => {
    if (!shouldLog('info')) {
      return;
    }
    const entry = createLogEntry('info', message, context);
    outputLog(entry);
  },

  warn: (message: string, context?: LogContext): void => {
    if (!shouldLog('warn')) {
      return;
    }
    const entry = createLogEntry('warn', message, context);
    outputLog(entry);
  },

  error: (message: string, error?: Error | unknown, context?: LogContext): void => {
    if (!shouldLog('error')) {
      return;
    }

    let errorContext = context;
    let stack: string | undefined;

    if (error) {
      const errorInfo = extractErrorInfo(error);
      errorContext = {
        ...context,
        errorMessage: errorInfo.message,
      };
      stack = errorInfo.stack;
    }

    const entry = createLogEntry('error', message, errorContext, stack);
    outputLog(entry);
  },
});

/**
 * Singleton logger instance for use throughout the application.
 */
export const logger: Logger = createLogger();

/**
 * Captured log entry for test assertions.
 */
export interface CapturedLog extends LogEntry {
  /** Original error object if one was passed */
  originalError?: Error | unknown;
}

/**
 * Test logger interface with additional methods for assertions.
 */
export interface TestLogger extends Logger {
  /** Get all captured log entries */
  getLogs: () => CapturedLog[];
  /** Get logs filtered by level */
  getLogsByLevel: (level: LogLevel) => CapturedLog[];
  /** Clear all captured logs */
  clear: () => void;
  /** Check if any log contains a specific message */
  hasLogWithMessage: (message: string) => boolean;
}

/**
 * Create a test logger that captures logs for assertions.
 * Useful for unit tests to verify logging behavior.
 *
 * @returns TestLogger instance with captured logs
 *
 * @example
 * ```typescript
 * const testLogger = createTestLogger();
 * // ... run code that logs ...
 * expect(testLogger.getLogsByLevel('error')).toHaveLength(1);
 * expect(testLogger.hasLogWithMessage('API Error')).toBe(true);
 * ```
 */
export const createTestLogger = (): TestLogger => {
  const logs: CapturedLog[] = [];

  const captureLog = (
    level: LogLevel,
    message: string,
    context?: LogContext,
    originalError?: Error | unknown
  ): void => {
    logs.push({
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      originalError,
    });
  };

  return {
    debug: (message: string, context?: LogContext): void => {
      captureLog('debug', message, context);
    },

    info: (message: string, context?: LogContext): void => {
      captureLog('info', message, context);
    },

    warn: (message: string, context?: LogContext): void => {
      captureLog('warn', message, context);
    },

    error: (message: string, error?: Error | unknown, context?: LogContext): void => {
      let errorContext = context;
      if (error) {
        const errorInfo = extractErrorInfo(error);
        errorContext = {
          ...context,
          errorMessage: errorInfo.message,
        };
      }
      captureLog('error', message, errorContext, error);
    },

    getLogs: (): CapturedLog[] => [...logs],

    getLogsByLevel: (level: LogLevel): CapturedLog[] => logs.filter(log => log.level === level),

    clear: (): void => {
      logs.length = 0;
    },

    hasLogWithMessage: (message: string): boolean =>
      logs.some(log => log.message.includes(message)),
  };
};
