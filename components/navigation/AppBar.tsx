import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {Appbar as AppBarPaper} from 'react-native-paper';
import AppSettings from '../AppSettings';

const AppBar = ({options, back, navigation}: StackHeaderProps) => {
  return (
    <AppBarPaper.Header>
      {back && <AppBarPaper.BackAction onPress={navigation.goBack} />}
      <AppBarPaper.Content title={options.title} />
      <AppSettings />
    </AppBarPaper.Header>
  );
};
export default AppBar;
