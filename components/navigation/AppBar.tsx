import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React from 'react';
import {Appbar as AppBarPaper} from 'react-native-paper';
import AppSettings from '../AppSettings';

const AppBar = ({options}: BottomTabHeaderProps) => {
  return (
    <AppBarPaper.Header>
      <AppBarPaper.Content title={options.title} />
      <AppSettings />
    </AppBarPaper.Header>
  );
};
export default AppBar;
