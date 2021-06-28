import * as React from 'react';
import * as Notifications from 'expo-notifications';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Menu,
  Dialog,
  Portal,
  Paragraph,
  TextInput,
} from 'react-native-paper';
import { restoreTodo, Task } from '../redux/TodosReducer';
import { formatRelative, set } from 'date-fns';
import { pl, enUS, enGB, enIN } from 'date-fns/locale';
import {
  deleteTodo,
  markTodoCompleted,
  renameTodo,
} from '../redux/TodosReducer';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { getNotificationByTaskId } from '../notificationsStorage/asyncStorage';

const localesMap = new Map<string, Locale>([
  ['pl', pl],
  ['en-US', enUS],
  ['en-GB', enGB],
  ['en-IN', enIN],
]);

type DoneTaskProps = {
  task: Task;
};

export const DoneTask = ({ task }: DoneTaskProps) => {
  const dispatch = useDispatch();
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [visibleDialog, setVisibleDialog] = React.useState(false);

  const [newTitle, setTitle] = React.useState(task.title);

  const showDialog = () => setVisibleDialog(true);

  const hideDialog = () => setVisibleDialog(false);

  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  const formattedTime = formatRelative(
    set(task.date, {
      ...task.time,
    }),
    new Date(),
    { locale: localesMap.get(i18n.currentLocale()) || enUS }
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
              onPress={() => {
                closeMenu();
                showDialog();
              }}
              title={i18n.t('taskMenu.changeTitle')}
            />
            <Menu.Item
              onPress={() => {
                dispatch(restoreTodo(task));
              }}
              title={i18n.t('taskMenu.restoreTask')}
            />
            <Menu.Item
              onPress={async () => {
                const notification = await getNotificationByTaskId(task.id);
                console.log('gettednotif', notification);
                if (notification) {
                  Notifications.cancelScheduledNotificationAsync(
                    notification.notificationIdentifier
                  )
                    .then((notif) => {
                      console.log('notifinmethod: ', notif);
                    })
                    .catch((err) => {
                      console.log('notiferror', err);
                    });
                }
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
            <TextInput
              defaultValue={task.title}
              value={newTitle}
              onChangeText={(value) => setTitle(value)}
              autoFocus
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              {i18n.t('taskMenu.renameInput.cancelButton')}
            </Button>
            <Button
              onPress={() => {
                dispatch(renameTodo({ task, title: newTitle }));
                hideDialog();
              }}
            >
              {i18n.t('taskMenu.renameInput.changeButton')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
