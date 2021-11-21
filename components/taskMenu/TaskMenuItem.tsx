import * as React from 'react';
import {Menu} from 'react-native-paper';
import {Task} from '../../types';
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
  return (
    <Menu.Item
      onPress={() => {
        callback(task);
        closeMenu();
      }}
      title={title}
    />
  );
};
export default TaskMenuItem;
