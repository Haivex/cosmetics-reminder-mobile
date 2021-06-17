import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, TextInput, Text, HelperText } from 'react-native-paper';
import DatePickerInput from '../components/DatePickerInput';
import { View } from '../components/Themed';
import TimePickerInput from '../components/TimePickerInput';
import Constants from 'expo-constants';
import { useForm, Controller } from 'react-hook-form';

type Time = {
  hours: number;
  minutes: number;
};

type FormData = {
  date: Date;
  time: string;
  title: Time;
};

export default function TabOneScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tytuł: </Text>
      <Controller<FormData>
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value as string}
            mode='outlined'
            placeholder='Tytuł zadania'
          />
        )}
        name='title'
      />
      <HelperText type='error' visible={errors.title ? true : false}>
        Uzupełnij tytuł
      </HelperText>

      <Text style={styles.title}>Data rozpoczęcia: </Text>
      <Controller<FormData>
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onBlur, onChange } }) => (
          <DatePickerInput onBlur={onBlur} onChange={onChange} />
        )}
        name='date'
      />
      <HelperText type='error' visible={errors.date ? true : false}>
        Uzupełnij datę
      </HelperText>

      <Text style={styles.title}>Godzina rozpoczęcia: </Text>
      <Controller<FormData>
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onBlur, onChange } }) => (
          <TimePickerInput onBlur={onBlur} onChange={onChange} />
        )}
        name='time'
      />
      <HelperText type='error' visible={errors.time ? true : false}>
        Uzupełnij czas
      </HelperText>
      <Button onPress={handleSubmit(onSubmit)} mode='outlined'>
        Ustaw
      </Button>
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
