import React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import NotificationsStatus from '../components/NotificationsStatus';
import {translate} from '../translation/config';

const NotificationsSettingsScreen = () => {
  return (
    <ScrollView>
      <List.Section>
        <List.Item
          title={translate('notificationsSettings.notificationsStatus')}
          right={() => <NotificationsStatus />}
        />
      </List.Section>
    </ScrollView>
  );
};
export default NotificationsSettingsScreen;
