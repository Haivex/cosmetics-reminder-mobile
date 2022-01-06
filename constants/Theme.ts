import {DefaultTheme} from 'react-native-paper';
import Colors from './Colors';

type Theme = typeof DefaultTheme;

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

export const darkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...Colors.dark,
  },
};

export const lightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...Colors.light,
  },
};
