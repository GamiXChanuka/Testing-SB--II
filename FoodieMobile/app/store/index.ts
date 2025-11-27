/**
 * Redux Toolkit store configuration for the Foodie application.
 * Provides centralized state management for local/app state.
 */

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/**
 * App-level state interface.
 * Contains global application state that doesn't belong to server data.
 */
export interface AppState {
  /** Whether the app has completed initial loading */
  isInitialized: boolean;
  /** Whether the app is currently in a loading state */
  isLoading: boolean;
  /** Global error message to display, if any */
  globalError: string | null;
}

/**
 * Initial app state.
 */
const initialAppState: AppState = {
  isInitialized: false,
  isLoading: false,
  globalError: null,
};

/**
 * App slice for managing global application state.
 */
const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    /**
     * Mark the app as initialized after startup procedures complete.
     */
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },

    /**
     * Set the global loading state.
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * Set a global error message.
     */
    setGlobalError: (state, action: PayloadAction<string | null>) => {
      state.globalError = action.payload;
    },

    /**
     * Clear the global error message.
     */
    clearGlobalError: state => {
      state.globalError = null;
    },

    /**
     * Reset app state to initial values.
     */
    resetAppState: () => initialAppState,
  },
});

/**
 * Export app actions for use in components and other parts of the app.
 */
export const { setInitialized, setLoading, setGlobalError, clearGlobalError, resetAppState } =
  appSlice.actions;

/**
 * Root state interface combining all slices.
 */
export interface RootState {
  app: AppState;
}

/**
 * Configure and create the Redux store.
 */
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // Enable serializable check in development
      serializableCheck: __DEV__,
      // Enable immutable check in development
      immutableCheck: __DEV__,
    }),
  devTools: __DEV__,
});

/**
 * Dispatch type for the store.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Typed useDispatch hook for the Foodie app.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Typed useSelector hook for the Foodie app.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Selector for app initialization state.
 */
export const selectIsInitialized = (state: RootState): boolean => state.app.isInitialized;

/**
 * Selector for global loading state.
 */
export const selectIsLoading = (state: RootState): boolean => state.app.isLoading;

/**
 * Selector for global error state.
 */
export const selectGlobalError = (state: RootState): string | null => state.app.globalError;
