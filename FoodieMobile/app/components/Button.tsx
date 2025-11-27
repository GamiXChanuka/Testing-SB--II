/**
 * Button Component
 *
 * A themed button component with multiple variants and sizes.
 * Supports loading states, disabled states, and accessibility features.
 */

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { colors, radii, spacing, typography } from '@app/theme';

import { Text } from './Text';

/**
 * Button variants.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/**
 * Button sizes.
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Button component props.
 */
export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether button should fill container width */
  fullWidth?: boolean;
  /** Show loading spinner */
  loading?: boolean;
  /** Disable button */
  disabled?: boolean;
  /** Button text or content */
  children: React.ReactNode;
  /** Additional style overrides */
  style?: ViewStyle;
}

/**
 * Variant color configurations.
 */
const variantColors: Record<
  ButtonVariant,
  {
    background: string;
    backgroundPressed: string;
    text: string;
    border?: string;
  }
> = {
  primary: {
    background: colors.primary.main,
    backgroundPressed: colors.primary.dark,
    text: colors.primary.contrast,
  },
  secondary: {
    background: colors.secondary.main,
    backgroundPressed: colors.secondary.dark,
    text: colors.secondary.contrast,
  },
  outline: {
    background: 'transparent',
    backgroundPressed: colors.neutral.background,
    text: colors.primary.main,
    border: colors.primary.main,
  },
  ghost: {
    background: 'transparent',
    backgroundPressed: colors.neutral.background,
    text: colors.primary.main,
  },
};

/**
 * Size configurations.
 */
const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  small: {
    container: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      minHeight: 36,
    },
    text: {
      fontSize: typography.fontSize.sm,
    },
  },
  medium: {
    container: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      minHeight: 48,
    },
    text: {
      fontSize: typography.fontSize.base,
    },
  },
  large: {
    container: {
      paddingVertical: spacing.md + spacing.xs,
      paddingHorizontal: spacing.xl,
      minHeight: 56,
    },
    text: {
      fontSize: typography.fontSize.lg,
    },
  },
};

/**
 * Button component with themed variants.
 *
 * @example
 * ```tsx
 * <Button onPress={handlePress}>Submit</Button>
 * <Button variant="outline" size="small" onPress={handlePress}>Cancel</Button>
 * <Button variant="primary" loading onPress={handlePress}>Processing...</Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  style,
  accessibilityLabel,
  accessibilityRole = 'button',
  ...props
}) => {
  const variantConfig = variantColors[variant];
  const sizeConfig = sizeStyles[size];
  const isDisabled = disabled || loading;

  const getBackgroundColor = (pressed: boolean): string => {
    if (isDisabled) {
      return colors.neutral.disabled;
    }
    return pressed ? variantConfig.backgroundPressed : variantConfig.background;
  };

  const getTextColor = (): string => {
    if (isDisabled) {
      return colors.neutral.text.disabled;
    }
    return variantConfig.text;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        sizeConfig.container,
        {
          backgroundColor: getBackgroundColor(pressed),
          borderWidth: variantConfig.border ? 1 : 0,
          borderColor: isDisabled ? colors.neutral.disabled : variantConfig.border,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
      disabled={isDisabled}
      accessibilityLabel={
        accessibilityLabel ?? (typeof children === 'string' ? children : undefined)
      }
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} accessibilityLabel="Loading" />
      ) : typeof children === 'string' ? (
        <Text
          style={{
            ...styles.text,
            ...sizeConfig.text,
            color: getTextColor(),
          }}
          weight="semibold"
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});
