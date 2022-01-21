import * as React from 'react';
import {Menu, useTheme} from 'react-native-paper';
import {Task} from '../../types';
import ThemedMarqueeText from '../ThemedMarqueeText';
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
  const theme = useTheme();
  return (
    <Menu.Item
      icon={icon}
      onPress={() => {
        callback(task);
        closeMenu();
      }}
      title={<ThemedMarqueeText theme={theme}>{title}</ThemedMarqueeText>}
    />
  );
};
export default TaskMenuItem;
