/**
 * Settings Stack Navigator
 *
 * Contains settings and profile screens.
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SettingsScreen } from '@app/screens';
import { colors, typography } from '@app/theme';

import { Routes, SettingsStackParamList } from './types';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

/**
 * Default screen options for the Settings stack.
 */
const screenOptions = {
  headerStyle: {
    backgroundColor: colors.neutral.surface,
  },
  headerTintColor: colors.neutral.text.primary,
  headerTitleStyle: {
    fontWeight: '600' as const,
    fontSize: typography.fontSize.lg,
  },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  animation: 'slide_from_right' as const,
};

/**
 * SettingsStack contains profile and settings screens.
 */
export const SettingsStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Routes.SETTINGS}
        component={SettingsScreen}
        options={{
          headerShown: false, // Custom header in screen
        }}
      />
    </Stack.Navigator>
  );
};
