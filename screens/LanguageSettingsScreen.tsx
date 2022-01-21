import React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import ThemeStatus from '../components/ThemeStatus';

const LanguageSettingsScreen = () => {
  return (
    <ScrollView>
      <List.Section>
        <List.Item title="Change language" right={() => <ThemeStatus />} />
      </List.Section>
    </ScrollView>
  );
};
export default LanguageSettingsScreen;
