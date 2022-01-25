import React from 'react';
import {ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import LanguageRadioButton from '../components/LanguageRadioButton';

const LanguageSettingsScreen = () => {
  const [value, setValue] = React.useState('first');
  return (
    <ScrollView>
      <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
        <LanguageRadioButton value="auto" label="auto" flagName="" />
        <LanguageRadioButton value="polish" label="polski" flagName="poland" />
        <LanguageRadioButton
          value="english"
          label="english"
          flagName="united-states-of-america"
        />
      </RadioButton.Group>
    </ScrollView>
  );
};
export default LanguageSettingsScreen;
