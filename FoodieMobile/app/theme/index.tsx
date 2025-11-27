/**
 * Theme configuration and provider for the Foodie application.
 * Provides centralized design tokens and theme context.
 */

import React, { createContext, ReactNode, useContext } from 'react';

/**
 * Color palette for the application.
 * Using a semantic naming convention for flexibility.
 */
export const colors = {
  // Brand colors
  primary: {
    main: '#FF6B35',
    light: '#FF8F66',
    dark: '#E55A24',
    contrast: '#FFFFFF',
  },
  secondary: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
    contrast: '#FFFFFF',
  },

  // Neutral colors
  neutral: {
    white: '#FFFFFF',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    border: '#E0E0E0',
    disabled: '#BDBDBD',
    placeholder: '#9E9E9E',
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#9E9E9E',
      inverse: '#FFFFFF',
    },
  },

  // Semantic colors
  semantic: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },

  // Overlay colors
  overlay: {
    light: 'rgba(255, 255, 255, 0.8)',
    dark: 'rgba(0, 0, 0, 0.5)',
  },
} as const;

/**
 * Typography scale for the application.
 * Based on a modular scale for visual harmony.
 */
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

/**
 * Spacing scale using a consistent 4px base unit.
 */
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

/**
 * Border radius values for consistent rounded corners.
 */
export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

/**
 * Shadow definitions for elevation effects.
 * Platform-specific shadows will need to be applied in components.
 */
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

/**
 * Z-index scale for layering elements.
 */
export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
} as const;

/**
 * Animation durations in milliseconds.
 */
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * Complete theme object combining all design tokens.
 */
export const theme = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  zIndex,
  animation,
} as const;

/**
 * Theme type derived from the theme object.
 */
export type Theme = typeof theme;

/**
 * Theme context for providing theme values throughout the app.
 */
const ThemeContext = createContext<Theme>(theme);

/**
 * Props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  children: ReactNode;
  customTheme?: Partial<Theme>;
}

/**
 * ThemeProvider component that provides theme context to the app.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, customTheme }) => {
  const mergedTheme = customTheme ? { ...theme, ...customTheme } : theme;

  return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
};

/**
 * Hook to access the current theme.
 */
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Utility function to create responsive spacing.
 * This can be extended to support dynamic scaling based on screen size.
 */
export const getSpacing = (multiplier: number): number => {
  return spacing.xs * multiplier;
};
