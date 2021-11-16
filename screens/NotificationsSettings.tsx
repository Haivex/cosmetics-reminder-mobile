import React from 'react';
import {ScrollView} from 'react-native';
import {Button, List} from 'react-native-paper';
import Notifications from 'react-native-push-notification';
import NotificationsStatus from '../components/NotificationsStatus';
import {storage} from '../redux/MainStore';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectNotifications} from '../redux/selectors';
import {translate} from '../translation/config';
const NotificationsSettingsScreen = () => {
  const state = useTrackedSelector();
  const notifications = selectNotifications(state);
  return (
    <ScrollView>
      <List.Section>
        <List.Item
          title={translate('notificationsSettings.notificationsStatus')}
          right={() => <NotificationsStatus />}
        />
      </List.Section>
      <Button
        onPress={() => {
          Notifications.localNotification({
            channelId: 'main',
            title: 'Only You',
            message: 'Test message',
          });
        }}
        mode="outlined">
        Single notif
      </Button>
      <Button
        onPress={() => {
          Notifications.localNotificationSchedule({
            channelId: 'main',
            title: 'Only You',
            message: 'Scheduled message',
            date: new Date(Date.now() + 10 * 1000),
            allowWhileIdle: false,
            repeatType: 'minute',
            repeatTime: 1,
          });
        }}
        mode="outlined">
        Scheduled notif repeating
      </Button>
      <Button
        onPress={() => {
          Notifications.localNotificationSchedule({
            id: 1,
            channelId: 'main',
            title: 'Only You',
            message: 'Scheduled message',
            date: new Date(Date.now() + 10 * 1000),
            allowWhileIdle: false,
            repeatType: undefined,
            repeatTime: 1,
          });
        }}
        mode="outlined">
        Scheduled notif single
      </Button>
      <Button
        onPress={() => {
          Notifications.getScheduledLocalNotifications(scheduled =>
            console.log(scheduled),
          );
        }}
        mode="outlined">
        Console scheduled notifications
      </Button>
      <Button
        onPress={() => {
          Notifications.cancelAllLocalNotifications();
        }}
        mode="outlined">
        Cancel notifications
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          storage.clearAll();
          console.info('Storage cleared');
        }}>
        Clear storage
      </Button>
      <Button
        onPress={() => {
          console.log(notifications);
        }}
        mode="outlined">
        Console notifications
      </Button>
    </ScrollView>
  );
};
export default NotificationsSettingsScreen;
