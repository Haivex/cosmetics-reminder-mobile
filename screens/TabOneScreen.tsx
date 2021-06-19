import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, TextInput, Text, HelperText } from 'react-native-paper';
import DatePickerInput from '../components/DatePickerInput';
import { View } from '../components/Themed';
import TimePickerInput from '../components/TimePickerInput';
import { useForm, Controller } from 'react-hook-form';
import { useReducer } from 'react';
import appReducer, { globalState } from '../store/MainStore';
import TodosContext from '../store/MainStore';

export type Time = {
  hours: number;
  minutes: number;
};

export type TaskData = {
  date: Date;
  time: Time;
  title: string;
};

export default function TabOneScreen() {
  const todos = React.useContext(TodosContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskData>();
  const onSubmit = (data: TaskData) => {
    todos.add(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tytuł: </Text>
      <Controller<TaskData>
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
      <Controller<TaskData>
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
      <Controller<TaskData>
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
