import {NavigationContainerRef} from '@react-navigation/core';
import * as React from 'react';
import {IconButton, Menu} from 'react-native-paper';
import {RootState} from '../redux/RootReducer';
import {RootStackParamList, Task} from '../types';
import TaskMenuItem from './TaskMenuItem';

type AppState = {
  navigation: React.RefObject<NavigationContainerRef<RootStackParamList>>;
  globalState: RootState;
};

export type SingleAction = {
  title: string;
  callback: (task: Task, appState?: AppState) => unknown;
};

type TaskMenuProps = {size: number; task: Task; actions: SingleAction[]};

const TaskMenu = ({size, actions, task}: TaskMenuProps) => {
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);
  return (
    <Menu
      visible={visibleMenu}
      onDismiss={closeMenu}
      anchor={
        <IconButton size={size} icon="dots-vertical" onPress={openMenu} />
      }>
      {actions.map((singleAction, index) => (
        <TaskMenuItem
          key={index}
          task={task}
          closeMenu={closeMenu}
          callback={singleAction.callback}
          title={singleAction.title}
        />
      ))}
    </Menu>
  );
};
export default TaskMenu;
