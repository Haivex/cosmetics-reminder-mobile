import * as React from 'react';
import { DefaultTheme } from 'react-native-paper';

// declare global {
//     namespace ReactNativePaper {
//       interface ThemeColors {
//         myOwnColor: string;
//       }
  
//       interface Theme {
//         myOwnProperty: boolean;
//       }
//     }
//   }

export const darkTheme = {
    ...DefaultTheme,
    dark: true,
    roundness: 2,
    colors: {
    ...DefaultTheme.colors,
    primary: '#72c4d6',
    accent: '#f1c40f',

  },
};

export const lightTheme = {
    ...DefaultTheme,
    dark: false,
    roundness: 2,
    colors: {
    ...DefaultTheme.colors,
    primary: '#72c4d6',
    accent: '#f1c40f',

  },
};
