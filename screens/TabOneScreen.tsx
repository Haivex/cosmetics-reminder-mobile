import * as React from 'react';
import { StyleSheet } from 'react-native';
import DatePickerInput from '../components/DatePickerInput';
import { Text, View } from '../components/Themed';
import TimePickerInput from '../components/TimePickerInput';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utwórz zadanie</Text>
      <DatePickerInput />
      <TimePickerInput/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
