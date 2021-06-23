import * as React from 'react';
import { Avatar, Button, Card, IconButton, Menu, Dialog, Portal, Paragraph, TextInput } from 'react-native-paper';
import { restoreTodo, Task } from '../redux/TodosReducer';
import { formatRelative, set } from 'date-fns';
import { pl } from 'date-fns/locale';
import {
  deleteTodo,
  markTodoCompleted,
  renameTodo,
} from '../redux/TodosReducer';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import i18n from 'i18n-js';

type DoneTaskProps = {
  task: Task;
};

export const DoneTask = ({ task }: DoneTaskProps) => {
    const dispatch = useDispatch();
    const [visibleMenu, setVisibleMenu] = React.useState(false);
    const [visibleDialog, setVisibleDialog] = React.useState(false);
  
    const [newTitle, setTitle] = React.useState(task.title)
  
    const showDialog = () => setVisibleDialog(true);
  
    const hideDialog = () => setVisibleDialog(false);
  
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
      <View>
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
            <Menu.Item
              onPress={() => {closeMenu(); showDialog()}}
              title={i18n.t('taskMenu.changeTitle')}
            />
            <Menu.Item onPress={() => {dispatch(restoreTodo(task))}} title={i18n.t('taskMenu.restoreTask')} />
            <Menu.Item
              onPress={() => {
                  dispatch(deleteTodo(task));
              }}
              title={i18n.t('taskMenu.deleteTask')}
            />
          </Menu>
        )}
      />
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>{i18n.t('taskMenu.renameInput.title')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{i18n.t('taskMenu.renameInput.description')}</Paragraph>
            <TextInput defaultValue={task.title} value={newTitle} onChangeText={(value) => setTitle(value)} autoFocus />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{i18n.t('taskMenu.renameInput.cancelButton')}</Button>
            <Button onPress={() => {
                dispatch(renameTodo({task, title: newTitle}))
                hideDialog()
            }}>{i18n.t('taskMenu.renameInput.changeButton')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      </View>
    );
};
