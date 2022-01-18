import * as React from 'react';
import {Menu} from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
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
  icon,
}: TaskMenuItemProps) => {
  return (
    <Menu.Item
      icon={icon}
      onPress={() => {
        callback(task);
        closeMenu();
      }}
      title={
        <TextTicker loop marqueeDelay={1000}>
          {title}
        </TextTicker>
      }
    />
  );
};
export default TaskMenuItem;
