/**
 * Text Component
 *
 * A themed text component with predefined variants for consistent typography.
 * Supports dynamic font scaling for accessibility.
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

import { colors, typography } from '@app/theme';

/**
 * Available text variants.
 */
export type TextVariant =
  | 'heading'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label';

/**
 * Text component props.
 */
export interface TextProps extends Omit<RNTextProps, 'style'> {
  /** Typography variant */
  variant?: TextVariant;
  /** Text color - can be a color key or direct color value */
  color?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Font weight override */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /** Additional style overrides */
  style?: TextStyle;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Variant style definitions.
 */
const variantStyles: Record<TextVariant, TextStyle> = {
  heading: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
    color: colors.neutral.text.primary,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
    color: colors.neutral.text.primary,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
    color: colors.neutral.text.secondary,
  },
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    color: colors.neutral.text.primary,
  },
  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    color: colors.neutral.text.secondary,
  },
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
    color: colors.neutral.text.secondary,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    color: colors.neutral.text.secondary,
  },
};

/**
 * Font weight mapping.
 */
const fontWeightMap: Record<string, TextStyle['fontWeight']> = {
  regular: typography.fontWeight.regular,
  medium: typography.fontWeight.medium,
  semibold: typography.fontWeight.semibold,
  bold: typography.fontWeight.bold,
};

/**
 * Text component with themed variants.
 *
 * @example
 * ```tsx
 * <Text variant="heading">Welcome to Foodie</Text>
 * <Text variant="body" color={colors.primary.main}>Highlighted text</Text>
 * <Text variant="caption" align="center">Centered caption</Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  align,
  weight,
  style,
  children,
  allowFontScaling = true,
  ...props
}) => {
  const variantStyle = variantStyles[variant];

  const combinedStyle: TextStyle = {
    ...variantStyle,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(weight && { fontWeight: fontWeightMap[weight] }),
    ...style,
  };

  return (
    <RNText style={combinedStyle} allowFontScaling={allowFontScaling} {...props}>
      {children}
    </RNText>
  );
};

/**
 * Pre-styled text components for common use cases.
 */
export const Heading: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="heading" accessibilityRole="header" {...props} />
);

export const Title: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="title" {...props} />
);

export const Subtitle: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="subtitle" {...props} />
);

export const Body: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="body" {...props} />
);

export const Caption: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="caption" {...props} />
);
