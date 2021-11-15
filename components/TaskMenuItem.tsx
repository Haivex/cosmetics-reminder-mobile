import * as React from 'react';
import {Menu} from 'react-native-paper';
import {navigationRef} from './navigation';
import {useTrackedSelector} from '../redux/RootReducer';
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
  const globalState = useTrackedSelector();
  const navigation = navigationRef;
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
