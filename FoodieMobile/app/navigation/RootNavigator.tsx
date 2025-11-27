/**
 * Root Navigator
 *
 * The main tab navigator that contains all navigation stacks.
 * Provides bottom tab navigation between Home, Orders, and Settings.
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@app/theme';

import { HomeStack } from './HomeStack';
import { OrdersStack } from './OrdersStack';
import { SettingsStack } from './SettingsStack';
import { RootTabParamList, Routes } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

/**
 * Tab bar icon component props.
 */
interface TabIconProps {
  focused: boolean;
  icon: string;
  label: string;
}

/**
 * Custom tab bar icon component.
 * Using text-based icons as placeholders for actual icon library.
 */
const TabIcon: React.FC<TabIconProps> = ({ focused, icon, label }) => {
  const iconColor = focused ? colors.primary.main : colors.neutral.text.secondary;
  const labelColor = focused ? colors.primary.main : colors.neutral.text.secondary;

  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, { color: iconColor }]}>{icon}</Text>
      <Text style={[styles.tabLabel, { color: labelColor }]}>{label}</Text>
    </View>
  );
};

/**
 * Tab bar screen options for consistent styling.
 */
const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: colors.neutral.surface,
    borderTopColor: colors.neutral.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: spacing.xs,
    paddingTop: spacing.xs,
  },
  tabBarActiveTintColor: colors.primary.main,
  tabBarInactiveTintColor: colors.neutral.text.secondary,
};

/**
 * RootNavigator provides the main tab-based navigation structure.
 */
export const RootNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={Routes.HOME_TAB}
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="🏠" label="Home" />,
          tabBarAccessibilityLabel: 'Home tab',
        }}
      />
      <Tab.Screen
        name={Routes.ORDERS_TAB}
        component={OrdersStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="📋" label="Orders" />,
          tabBarAccessibilityLabel: 'Orders tab',
        }}
      />
      <Tab.Screen
        name={Routes.SETTINGS_TAB}
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="⚙️" label="Settings" />,
          tabBarAccessibilityLabel: 'Settings tab',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
});
