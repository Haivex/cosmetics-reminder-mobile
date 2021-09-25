import i18n from 'i18n-js';
import * as React from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

interface CyclicDataInputProps {
  onBlur: () => void;
  onChange: (...event: any[]) => void;
  value: CyclicInterval;
}

export type CyclicInterval = {
  days: number;
  hours: number;
  minutes: number;
};

const CyclicTaskInputs = ({onChange, onBlur, value}: CyclicDataInputProps) => {
  return (
    <View>
      <Text>{i18n.t('createTaskScreen.cyclicInputs.days')}</Text>
      <TextInput
        keyboardType="numeric"
        onBlur={onBlur}
        onChangeText={(valueFromInputs: string) => {
          onChange({...value, days: Number(valueFromInputs)});
        }}
        value={value?.days?.toString() || '0'}
        mode="outlined"
      />
      <Text>{i18n.t('createTaskScreen.cyclicInputs.hours')}</Text>
      <TextInput
        keyboardType="numeric"
        onBlur={onBlur}
        onChangeText={(valueFromInput: string) => {
          onChange({...value, hours: Number(valueFromInput)});
        }}
        value={value?.hours?.toString() || '0'}
        mode="outlined"
      />
      <Text>{i18n.t('createTaskScreen.cyclicInputs.minutes')}</Text>
      <TextInput
        keyboardType="numeric"
        onBlur={onBlur}
        onChangeText={(valueFromInput: string) => {
          onChange({...value, minutes: Number(valueFromInput)});
        }}
        value={value?.minutes?.toString() || '0'}
        mode="outlined"
      />
    </View>
  );
};

export default CyclicTaskInputs;
