/**
 * Shared UI components for the Foodie application.
 * This file serves as the barrel export for all reusable components.
 */

// Error handling components
export { ErrorBoundary } from './ErrorBoundary';
export type { ErrorBoundaryProps } from './ErrorBoundary';

export { ErrorScreen } from './ErrorScreen';
export type { ErrorScreenProps } from './ErrorScreen';

// Typography
export { Text, Heading, Title, Subtitle, Body, Caption } from './Text';
export type { TextProps, TextVariant } from './Text';

// Buttons
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

// Cards
export { Card, CardHeader, CardContent, CardFooter } from './Card';
export type { CardProps, CardPadding } from './Card';

// Screen containers
export { ScreenContainer, ScreenHeader, ScreenFooter } from './ScreenContainer';
export type { ScreenContainerProps } from './ScreenContainer';

// List items
export { ListItem, ListItemSeparator, ListItemGroup } from './ListItem';
export type { ListItemProps } from './ListItem';

// Icons and avatars
export { Icon, Avatar } from './Icon';
export type { IconProps, IconName, AvatarProps } from './Icon';

// Badges
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant } from './Badge';
