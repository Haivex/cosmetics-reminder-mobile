import * as React from 'react';
import i18n from 'i18n-js';
import { TextInput } from 'react-native-paper';
import { View, Text } from 'react-native';

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

const CyclicTaskInputs = ({
  onChange,
  onBlur,
  value
}: CyclicDataInputProps) => {
//   const [cyclicInterval, setCylicInterval] = React.useState<CyclicInterval>({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//   });

  return (
    <View>
      <Text>{i18n.t('createTaskScreen.cyclicInputs.days')}</Text>
      <TextInput
        keyboardType='numeric'
        onBlur={onBlur}
        onChangeText={(valueFromInputs: string) => {
          onChange({ ...value, days: Number(valueFromInputs) });
          //setCylicInterval({ ...value, days: Number(valueFromInputs) });
        }}
        value={value?.days?.toString() || '0'}
        mode='outlined'
      />
      <Text>{i18n.t('createTaskScreen.cyclicInputs.hours')}</Text>
      <TextInput
        keyboardType='numeric'
        onBlur={onBlur}
        onChangeText={(valueFromInput: string) => {
          onChange({ ...value, hours: Number(valueFromInput) });
          //setCylicInterval({ ...value, hours: Number(valueFromInput) });
        }}
        value={value?.hours?.toString() || '0'}
        mode='outlined'
      />
      <Text>{i18n.t('createTaskScreen.cyclicInputs.minutes')}</Text>
      <TextInput
        keyboardType='numeric'
        onBlur={onBlur}
        onChangeText={(valueFromInput: string) => {
          onChange({ ...value, minutes: Number(valueFromInput) });
         // setCylicInterval({ ...value, minutes: Number(valueFromInput) });
        }}
        value={value?.minutes?.toString() || '0'}
        mode='outlined'
      />
    </View>
  );
};

export default CyclicTaskInputs;
