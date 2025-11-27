/**
 * Icon Component
 *
 * A placeholder icon component using emoji/text.
 * In a production app, this would be replaced with a proper icon library
 * like react-native-vector-icons or a custom SVG icon system.
 */

import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, radii, spacing } from '@app/theme';

/**
 * Available icon names (using emoji as placeholders).
 */
export type IconName =
  | 'home'
  | 'orders'
  | 'settings'
  | 'user'
  | 'location'
  | 'payment'
  | 'notification'
  | 'language'
  | 'theme'
  | 'help'
  | 'feedback'
  | 'info'
  | 'star'
  | 'cart'
  | 'check'
  | 'error'
  | 'chevronRight';

/**
 * Icon emoji mapping.
 */
const iconMap: Record<IconName, string> = {
  home: '🏠',
  orders: '📋',
  settings: '⚙️',
  user: '👤',
  location: '📍',
  payment: '💳',
  notification: '🔔',
  language: '🌐',
  theme: '🎨',
  help: '❓',
  feedback: '💬',
  info: 'ℹ️',
  star: '⭐',
  cart: '🛒',
  check: '✓',
  error: '!',
  chevronRight: '›',
};

/**
 * Icon component props.
 */
export interface IconProps {
  /** Icon name */
  name: IconName;
  /** Icon size */
  size?: number;
  /** Icon color (for text-based icons) */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Whether to show background circle */
  showBackground?: boolean;
  /** Additional style */
  style?: ViewStyle;
}

/**
 * Icon component using emoji placeholders.
 *
 * @example
 * ```tsx
 * <Icon name="home" />
 * <Icon name="user" size={32} showBackground />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  backgroundColor = colors.neutral.background,
  showBackground = false,
  style,
}) => {
  const emoji = iconMap[name];

  if (showBackground) {
    return (
      <View
        style={[
          styles.background,
          {
            width: size + spacing.md,
            height: size + spacing.md,
            borderRadius: radii.md,
            backgroundColor,
          },
          style,
        ]}
      >
        <Text style={[styles.icon, { fontSize: size, color }]}>{emoji}</Text>
      </View>
    );
  }

  return <Text style={[styles.icon, { fontSize: size, color }, style]}>{emoji}</Text>;
};

/**
 * Avatar size options.
 */
export type AvatarSize = 'small' | 'medium' | 'large';

/**
 * Size mapping for avatars.
 */
const avatarSizeMap: Record<AvatarSize, number> = {
  small: 32,
  medium: 44,
  large: 56,
};

/**
 * Avatar component for user/restaurant images.
 */
export interface AvatarProps {
  /** Name to generate initials from */
  name: string;
  /** Size preset or custom number */
  size?: AvatarSize | number;
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  color?: string;
  /** Additional style */
  style?: ViewStyle;
}

/**
 * Get initials from a name.
 */
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0]?.[0] ?? '';
    const last = parts[parts.length - 1]?.[0] ?? '';
    return (first + last).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

/**
 * Avatar component for displaying user/entity initials.
 */
export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'medium',
  backgroundColor = colors.primary.main,
  color = colors.primary.contrast,
  style,
}) => {
  const sizeValue = typeof size === 'number' ? size : avatarSizeMap[size];
  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.avatar,
        {
          width: sizeValue,
          height: sizeValue,
          borderRadius: sizeValue / 2,
          backgroundColor,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.avatarText,
          {
            fontSize: sizeValue * 0.4,
            color,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: '600',
  },
});
