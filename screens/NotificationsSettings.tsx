import i18n from 'i18n-js';
import React from 'react';
import {Text, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
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
    </ScrollView>
  );
};
export default NotificationsSettings;
