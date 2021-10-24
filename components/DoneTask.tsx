import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import {formatRelative} from 'date-fns';
import {enGB, enIN, enUS, pl} from 'date-fns/locale';
import i18n from 'i18n-js';
import * as React from 'react';
import {View} from 'react-native';
//import * as Notifications from 'expo-notifications';
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
//import { getNotificationByTaskId } from '../notificationsStorage/asyncStorage';
import Notifications from 'react-native-push-notification';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTask} from '../firebase/deleteTask';
import {renameTask} from '../firebase/renameTask';
import {updateTaskCompletion} from '../firebase/updateTaskCompletion';
import {RootState} from '../redux/RootReducer';
import {deleteTodo, renameTodo, restoreTodo} from '../redux/TodosReducer';
import {translate} from '../translation/config';
import {Task} from '../types';

const localesMap = new Map<string, Locale>([
  ['pl', pl],
  ['en-US', enUS],
  ['en-GB', enGB],
  ['en-IN', enIN],
]);

type DoneTaskProps = {
  task: Task;
};

export const DoneTask = ({task}: DoneTaskProps) => {
  const navigation = useNavigation();
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
              title={translate('taskMenu.changeTitle')}
            />
            <Menu.Item
              onPress={() => {
                updateTaskCompletion(task.id, false).then(() =>
                  dispatch(restoreTodo(task)),
                );
              }}
              title={translate('taskMenu.restoreTask')}
            />
            <Menu.Item
              onPress={async () => {
                // const notification = await getNotificationByTaskId(task.id);

                // if (notification) {
                //   Notifications.cancelScheduledNotificationAsync(
                //     notification.notificationIdentifier
                //   )
                //     .then((notif) => {

                //     })
                //     .catch((err) => {

                //     });
                // }
                deleteTask(task.id).then(() => {
                  dispatch(deleteTodo(task));
                  Notifications.cancelLocalNotification(
                    storedNotification?.notificationId.toString() || '',
                  );
                });
              }}
              title={translate('taskMenu.deleteTask')}
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigation.navigate('TaskEdition', task);
              }}
              title={translate('taskMenu.editTask')}
            />
          </Menu>
        )}
      />
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>{translate('taskMenu.renameInput.title')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {translate('taskMenu.renameInput.description')}
            </Paragraph>
            <TextInput
              defaultValue={task.title}
              value={newTitle}
              onChangeText={value => setTitle(value)}
              autoFocus
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              {translate('taskMenu.renameInput.cancelButton')}
            </Button>
            <Button
              onPress={() => {
                renameTask(task.id, newTitle).then(() =>
                  dispatch(renameTodo({task, title: newTitle})),
                );
                hideDialog();
              }}>
              {translate('taskMenu.renameInput.changeButton')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
