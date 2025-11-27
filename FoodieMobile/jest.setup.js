/**
 * Jest setup file for configuring test environment.
 */

// Mock the global __DEV__ variable
global.__DEV__ = true;

// Silence console logs during tests unless specifically testing them
jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'info').mockImplementation(() => {});
jest.spyOn(console, 'debug').mockImplementation(() => {});

// Allow console.warn and console.error to show in tests
// as these are often useful for debugging
