import i18n from 'i18n-js';
import React from 'react';
import {ScrollView} from 'react-native';
import {Button, List} from 'react-native-paper';
import Notifications from 'react-native-push-notification';
import {storage} from '../App';
import NotificationsStatus from '../components/NotificationsStatus';
const NotificationsSettings = () => {
  return (
    <ScrollView>
      <List.Section>
        <List.Item
          title={i18n.t('notificationsSettings.notificationsStatus')}
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
        Scheduled notif
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
          console.log('Storage cleared');
        }}>
        Clear storage
      </Button>
    </ScrollView>
  );
};
export default NotificationsSettings;
