import React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import ThemeStatus from '../components/ThemeStatus';
import {translate} from '../translation/config';

const AppearanceSettingsScreen = () => {
  return (
    <ScrollView>
      <List.Section>
        <List.Item
          title={translate('appearanceSettings.changeTheme')}
          right={() => <ThemeStatus />}
        />
      </List.Section>
    </ScrollView>
  );
};
export default AppearanceSettingsScreen;
