/**
 * Settings Screen
 *
 * Displays user profile information and app settings.
 * Provides access to account management, preferences, and help.
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { config } from '@app/config';
import { colors, radii, shadows, spacing, typography } from '@app/theme';

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
  const renderSettingsItem = (item: SettingsItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingsItem}
      accessibilityRole="button"
      accessibilityLabel={item.title}
      accessibilityHint={item.subtitle}
    >
      <View style={styles.itemIcon}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        {item.subtitle && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <TouchableOpacity
          style={styles.profileCard}
          accessibilityRole="button"
          accessibilityLabel="View profile"
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>{section.items.map(renderSettingsItem)}</View>
          </View>
        ))}

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutButton}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Environment Info (Development Only) */}
        {config.enableDebugLogging && (
          <View style={styles.debugInfo}>
            <Text style={styles.debugText}>Environment: {config.environment}</Text>
            <Text style={styles.debugText}>API: {config.apiBaseUrl}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: radii.full,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.contrast,
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  profileName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.text.primary,
  },
  profileEmail: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xs,
  },
  chevron: {
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral.text.disabled,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  sectionContent: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.neutral.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: typography.fontSize.lg,
  },
  itemContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  itemTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral.text.primary,
  },
  itemSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.text.secondary,
    marginTop: 2,
  },
  signOutButton: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
    ...shadows.sm,
  },
  signOutText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.semantic.error,
  },
  debugInfo: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.neutral.border,
    borderRadius: radii.md,
  },
  debugText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.text.secondary,
    fontFamily: 'monospace',
  },
});
