import * as React from 'react';
import i18n from 'i18n-js';
import { TextInput } from 'react-native-paper';
import { View, Text } from 'react-native';

interface CyclicDataInputProps {
  onBlur: () => void;
  onChange: (...event: any[]) => void;
}

export type CyclicInterval = {
  days: number;
  hours: number;
  minutes: number;
};

const CyclicTaskInputs = ({
  onChange,
  onBlur,
}: CyclicDataInputProps) => {
  const [cyclicInterval, setCylicInterval] = React.useState<CyclicInterval>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  return (
    <View>
      <Text>{i18n.t('createTaskScreen.cyclicInputs.days')}</Text>
      <TextInput
        keyboardType='numeric'
        onBlur={onBlur}
        onChangeText={(value: string) => {
          onChange({ ...cyclicInterval, days: Number(value) });
          setCylicInterval({ ...cyclicInterval, days: Number(value) });
        }}
        value={cyclicInterval.days.toString()}
        mode='outlined'
      />
      <Text>{i18n.t('createTaskScreen.cyclicInputs.hours')}</Text>
      <TextInput
        keyboardType='numeric'
        onBlur={onBlur}
        onChangeText={(value: string) => {
          onChange({ ...cyclicInterval, hours: Number(value) });
          setCylicInterval({ ...cyclicInterval, hours: Number(value) });
        }}
        value={cyclicInterval.hours.toString()}
        mode='outlined'
      />
      <Text>{i18n.t('createTaskScreen.cyclicInputs.minutes')}</Text>
      <TextInput
        keyboardType='numeric'
        onBlur={onBlur}
        onChangeText={(value: string) => {
          onChange({ ...cyclicInterval, minutes: Number(value) });
          setCylicInterval({ ...cyclicInterval, minutes: Number(value) });
        }}
        value={cyclicInterval.minutes.toString()}
        mode='outlined'
      />
    </View>
  );
};

export default CyclicTaskInputs;
