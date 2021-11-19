import * as React from 'react';
import {IconButton, Menu} from 'react-native-paper';
import {Task} from '../../types';
import TaskMenuItem from './TaskMenuItem';

export type SingleAction = {
  title: string;
  callback: (task: Task) => unknown;
};

type TaskMenuProps = {task: Task; actions: SingleAction[]};

const TaskMenu = ({actions, task}: TaskMenuProps) => {
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);
  return (
    <Menu
      visible={visibleMenu}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
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
