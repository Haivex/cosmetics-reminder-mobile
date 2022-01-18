import {
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from '@react-navigation/native';
import {
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from 'react-native-paper';
import Colors from './Colors';

type Theme = typeof DefaultThemePaper;
export type ExtendedTheme = Theme & typeof DefaultThemeNavigation;

export const darkTheme: ExtendedTheme = {
  ...DarkThemeNavigation,
  ...DarkThemePaper,
  dark: true,
  roundness: 2,
  colors: {
    ...DarkThemeNavigation.colors,
    ...DarkThemePaper.colors,
    ...Colors.dark,
  },
};

export const lightTheme: ExtendedTheme = {
  ...DefaultThemeNavigation,
  ...DefaultThemePaper,
  dark: false,
  roundness: 2,
  colors: {
    ...DefaultThemeNavigation.colors,
    ...DefaultThemePaper.colors,
    ...Colors.light,
  },
};
