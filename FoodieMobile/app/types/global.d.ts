/**
 * Global type declarations for React Native environment.
 */

/**
 * React Native development mode flag.
 * This is true when running in development mode, false in production builds.
 */
declare const __DEV__: boolean;

/**
 * Module declarations for non-TypeScript assets.
 */
declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.jpg' {
  const value: number;
  export default value;
}

declare module '*.jpeg' {
  const value: number;
  export default value;
}

declare module '*.gif' {
  const value: number;
  export default value;
}

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
