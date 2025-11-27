/**
 * Foodie Mobile Application Entry Point
 *
 * This file registers the root component with React Native's AppRegistry.
 * It's the first JavaScript code that runs when the app starts.
 */

import { AppRegistry } from 'react-native';

import App from './app/App';
import { name as appName } from './app.json';

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
