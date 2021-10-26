import {NavigationContainerRefContext} from '@react-navigation/core';
import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';
import {Menu} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {navigationRef} from '../navigation';
import {RootState} from '../redux/RootReducer';
import {Task} from '../types';
import {SingleAction} from './TaskMenu';

interface TaskMenuItemProps extends SingleAction {
  task: Task;
  closeMenu: () => void;
}

const TaskMenuItem = ({
  task,
  closeMenu,
  title,
  callback,
}: TaskMenuItemProps) => {
  const navigation = navigationRef;
  const globalState = useSelector((givenState: RootState) => givenState);
  const appState = {navigation, globalState};
  return (
    <Menu.Item
      onPress={() => {
        callback(task, appState);
        closeMenu();
      }}
      title={title}
    />
  );
};
export default TaskMenuItem;
