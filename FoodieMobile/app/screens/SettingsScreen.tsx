/**
 * Settings Screen
 *
 * Displays user profile information and app settings.
 * Provides access to account management, preferences, and help.
 */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  Avatar,
  Button,
  Card,
  ListItem,
  ScreenContainer,
  ScreenHeader,
  Text,
} from '@app/components';
import { config } from '@app/config';
import { colors, spacing } from '@app/theme';

import type { SettingsScreenProps } from '@app/navigation/types';

/**
 * Settings menu item type.
 */
interface SettingsItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
}

/**
 * Settings sections with items.
 */
const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      { id: 'profile', title: 'Edit Profile', subtitle: 'Name, email, phone', icon: '👤' },
      { id: 'addresses', title: 'Saved Addresses', subtitle: '2 addresses', icon: '📍' },
      { id: 'payment', title: 'Payment Methods', subtitle: '1 card saved', icon: '💳' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'notifications', title: 'Notifications', subtitle: 'Push, email, SMS', icon: '🔔' },
      { id: 'language', title: 'Language', subtitle: 'English', icon: '🌐' },
      { id: 'appearance', title: 'Appearance', subtitle: 'Light mode', icon: '🎨' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', title: 'Help Center', icon: '❓' },
      { id: 'feedback', title: 'Send Feedback', icon: '💬' },
      { id: 'about', title: 'About Foodie', subtitle: `Version ${config.appVersion}`, icon: 'ℹ️' },
    ],
  },
];

/**
 * SettingsScreen provides access to user settings and preferences.
 */
export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const renderSettingsItem = (item: SettingsItem, isLast: boolean) => (
    <ListItem
      key={item.id}
      title={item.title}
      subtitle={item.subtitle}
      leftElement={<Text variant="subtitle">{item.icon}</Text>}
      showChevron
      isLast={isLast}
      onPress={() => {}}
      accessibilityLabel={item.title}
      accessibilityHint={item.subtitle}
    />
  );

  return (
    <ScreenContainer edges={['top']}>
      <ScreenHeader bordered={false}>
        <Text variant="heading">Settings</Text>
      </ScreenHeader>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <Card style={styles.profileCard} onPress={() => {}} accessibilityLabel="View profile">
          <View style={styles.profileContent}>
            <Avatar name="John Doe" size={60} />
            <View style={styles.profileInfo}>
              <Text variant="subtitle" weight="semibold">
                John Doe
              </Text>
              <Text variant="bodySmall" color={colors.neutral.text.secondary}>
                john.doe@example.com
              </Text>
            </View>
            <Text variant="heading" color={colors.neutral.text.disabled}>
              ›
            </Text>
          </View>
        </Card>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text
              variant="caption"
              weight="medium"
              color={colors.neutral.text.secondary}
              style={styles.sectionTitle}
            >
              {section.title.toUpperCase()}
            </Text>
            <Card padding="none">
              {section.items.map((item, index) =>
                renderSettingsItem(item, index === section.items.length - 1)
              )}
            </Card>
          </View>
        ))}

        {/* Sign Out Button */}
        <Button
          variant="ghost"
          fullWidth
          style={styles.signOutButton}
          accessibilityLabel="Sign out"
        >
          <Text variant="body" weight="semibold" color={colors.semantic.error}>
            Sign Out
          </Text>
        </Button>

        {/* Environment Info (Development Only) */}
        {config.enableDebugLogging && (
          <View style={styles.debugInfo}>
            <Text variant="caption" color={colors.neutral.text.secondary} style={styles.debugText}>
              Environment: {config.environment}
            </Text>
            <Text variant="caption" color={colors.neutral.text.secondary} style={styles.debugText}>
              API: {config.apiBaseUrl}
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  profileCard: {
    marginBottom: spacing.lg,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  signOutButton: {
    marginTop: spacing.md,
    backgroundColor: colors.neutral.surface,
  },
  debugInfo: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.neutral.border,
    borderRadius: spacing.sm,
  },
  debugText: {
    fontFamily: 'monospace',
  },
});
