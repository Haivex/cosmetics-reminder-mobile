import * as React from 'react';
import { Avatar, Card, IconButton, Menu } from 'react-native-paper';
import { deleteTodo, renameTodo, Task } from '../redux/TodosReducer';
import { formatRelative, set } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useDispatch } from 'react-redux';

type DoneTaskProps = {
  task: Task;
};

export const DoneTask = ({ task }: DoneTaskProps) => {
  const dispatch = useDispatch();

  const [visibleMenu, setVisibleMenu] = React.useState(false);

  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  return (
    <Card.Title
      title={task.title}
      subtitle={`${formatRelative(
        set(task.date, {
          ...task.time,
        }),
        new Date(),
        { locale: pl }
      )}`}
      left={(props) => <Avatar.Icon {...props} icon='folder' />}
      right={(props) => (
        <Menu
          visible={visibleMenu}
          onDismiss={closeMenu}
          anchor={
            <IconButton {...props} icon='dots-vertical' onPress={openMenu} />
          }
        >
          <Menu.Item onPress={() => {}} title='Przywróć' />
          <Menu.Item
            onPress={() => {
              dispatch(renameTodo({ task, title: 'ngrt' }));
            }}
            title='Zmień nazwę'
          />
          <Menu.Item
            onPress={() => {
              dispatch(deleteTodo(task));
            }}
            title='Usuń'
          />
        </Menu>
      )}
    />
  );
};
