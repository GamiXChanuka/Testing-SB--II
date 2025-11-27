# Foodie Mobile App

A React Native mobile application for food ordering and delivery, built for iOS and Android.

## Prerequisites

- Node.js >= 18
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## Getting Started

### Install Dependencies

```bash
npm install
```

### iOS Setup

```bash
cd ios && pod install && cd ..
```

### Running the App

**iOS:**

```bash
npm run ios
```

**Android:**

```bash
npm run android
```

**Start Metro Bundler:**

```bash
npm start
```

## Project Structure

```
FoodieMobile/
├── app/                    # Main application code
│   ├── analytics/          # Analytics abstraction layer
│   ├── api/                # API client and services
│   ├── components/         # Shared UI components
│   ├── config/             # Environment configuration
│   ├── logging/            # Centralized logging utility
│   ├── navigation/         # React Navigation setup
│   ├── query/              # React Query configuration
│   ├── screens/            # Screen components
│   ├── store/              # Redux Toolkit store
│   ├── theme/              # Design tokens and theme
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Root application component
├── android/                # Android native code
├── ios/                    # iOS native code
└── index.js                # Application entry point
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run Jest tests

## Technology Stack

- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **Axios** - HTTP client

## Platform Support

- iOS 15+
- Android 12+ (API level 31+)
