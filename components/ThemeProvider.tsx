import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import useTheme from '../hooks/useTheme';
import {ChildrenProp} from './types';

const ThemeProvider = ({children}: ChildrenProp) => {
  const currentTheme = useTheme();
  return <PaperProvider theme={currentTheme}>{children}</PaperProvider>;
};
export default ThemeProvider;
