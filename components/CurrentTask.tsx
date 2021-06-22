import * as React from 'react';
import { Avatar, Card, IconButton, Menu } from 'react-native-paper';
import { Task } from '../redux/TodosReducer';
import { formatRelative, set } from 'date-fns';
import { pl } from 'date-fns/locale';

type CurrentTaskProps = {
  task: Task;
};

export const CurrentTask = ({ task }: CurrentTaskProps) => {
  const [visibleMenu, setVisibleMenu] = React.useState(false);

  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  const formattedTime = formatRelative(
    set(task.date, {
      ...task.time,
    }),
    new Date(),
    { locale: pl }
  );

  return (
    <Card.Title
      title={task.title}
      subtitle={formattedTime}
      left={(props) => <Avatar.Icon {...props} icon='folder' />}
      right={(props) => (
        <Menu
          visible={visibleMenu}
          onDismiss={closeMenu}
          anchor={
            <IconButton {...props} icon='dots-vertical' onPress={openMenu} />
          }
        >
          <Menu.Item onPress={() => {}} title='Zmień nazwę' />
          <Menu.Item onPress={() => {}} title='Ukończ' />
          <Menu.Item onPress={() => {}} title='Usuń' />
        </Menu>
      )}
    />
  );
};
