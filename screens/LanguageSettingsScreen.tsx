import React from 'react';
import {ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import RNRestart from 'react-native-restart';
import {useDispatch} from 'react-redux';
import LanguageRadioButton from '../components/LanguageRadioButton';
import {changeLanguage, Language} from '../redux/LanguageReducer';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectLanguage} from '../redux/selectors';

const LanguageSettingsScreen = () => {
  const state = useTrackedSelector();
  const currentLanguage = selectLanguage(state);
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <RadioButton.Group
        onValueChange={changedValue => {
          dispatch(changeLanguage(changedValue as Language['currentLanguage']));
          RNRestart.Restart();
        }}
        value={currentLanguage}>
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
