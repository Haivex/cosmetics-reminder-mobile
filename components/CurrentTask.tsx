import {formatRelative} from 'date-fns';
import {enGB, enIN, enUS, pl} from 'date-fns/locale';
import i18n from 'i18n-js';
import * as React from 'react';
import {View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Dialog,
  IconButton,
  Menu,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../firebase/deleteTask';
import {renameTask} from '../firebase/renameTask';
import {updateTaskCompletion} from '../firebase/updateTaskCompletion';
import {
  deleteTodo,
  markTodoCompleted,
  renameTodo,
  Task,
} from '../redux/TodosReducer';
import {RootState} from '../redux/RootReducer';
import Notifications from 'react-native-push-notification';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {TaskDocument} from '../firebase/firestoreTypes';

const localesMap = new Map<string, Locale>([
  ['pl', pl],
  ['en-US', enUS],
  ['en-GB', enGB],
  ['en-IN', enIN],
]);

type CurrentTaskProps = {
  task: TaskDocument;
};

export const CurrentTask = ({task}: CurrentTaskProps) => {
  const dispatch = useDispatch();
  const {storedNotifications} = useSelector(
    (state: RootState) => state.notifications,
  );
  const storedNotification = storedNotifications.find(
    notification => notification.taskId === task.id,
  );
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [visibleDialog, setVisibleDialog] = React.useState(false);

  const [newTitle, setTitle] = React.useState(task.title);

  const showDialog = () => setVisibleDialog(true);

  const hideDialog = () => setVisibleDialog(false);

  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  const formattedTime = formatRelative(
    new firestore.Timestamp(
      task.date.seconds,
      task.date.nanoseconds,
    ).toMillis(),
    new Date(),
    {
      locale: localesMap.get(i18n.currentLocale()) || enUS,
    },
  );

  return (
    <View>
      <Card.Title
        title={task.title}
        subtitle={formattedTime}
        left={props => <Avatar.Icon {...props} icon="folder" />}
        right={props => (
          <Menu
            visible={visibleMenu}
            onDismiss={closeMenu}
            anchor={
              <IconButton {...props} icon="dots-vertical" onPress={openMenu} />
            }>
            <Menu.Item
              onPress={() => {
                closeMenu();
                showDialog();
              }}
              title={i18n.t('taskMenu.changeTitle')}
            />
            <Menu.Item
              onPress={() => {
                updateTaskCompletion(task.id, true).then(() =>
                  dispatch(markTodoCompleted(task)),
                );
              }}
              title={i18n.t('taskMenu.finishTask')}
            />
            <Menu.Item
              onPress={async () => {
                deleteTask(task.id).then(() => {
                  dispatch(deleteTodo(task));
                  Notifications.cancelLocalNotification(
                    storedNotification?.notificationId.toString() || '',
                  );
                });
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
              onChangeText={value => setTitle(value)}
              autoFocus
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              {i18n.t('taskMenu.renameInput.cancelButton')}
            </Button>
            <Button
              onPress={() => {
                renameTask(task.id, newTitle).then(() =>
                  dispatch(renameTodo({task, title: newTitle})),
                );
                hideDialog();
              }}>
              {i18n.t('taskMenu.renameInput.changeButton')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
