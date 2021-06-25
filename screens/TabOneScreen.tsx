import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, TextInput, Text, HelperText } from 'react-native-paper';
import DatePickerInput from '../components/DatePickerInput';
import { View } from '../components/Themed';
import TimePickerInput from '../components/TimePickerInput';
import { useForm, Controller } from 'react-hook-form';
import { addTodo } from '../redux/TodosReducer';
import { useDispatch } from 'react-redux';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';
import {schedulePushNotification} from '../components/NotificationWrapper';
import { set } from 'date-fns';
import '../translation/config';
import i18n from 'i18n-js';

export type Time = {
  hours: number;
  minutes: number;
};

export type TaskData = {
  date: CalendarDate;
  time: Time;
  title: string;
};

export default function TabOneScreen() {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskData>();
  const onSubmit = (data: TaskData) => {
    dispatch(addTodo(data));
    schedulePushNotification({
      title: 'Only You',
      body: data.title,
      scheduledDate: set(data.date as Date, {
        hours: data.time.hours,
        minutes: data.time.minutes
      })
    })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('createTaskScreen.titleTitle')}: </Text>
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
            placeholder={i18n.t('createTaskScreen.titleInputPlaceholder')}
          />
        )}
        name='title'
      />
      <HelperText type='error' visible={errors.title ? true : false}>
        {i18n.t('createTaskScreen.titleHelperText')}
      </HelperText>

      <Text style={styles.title}>{i18n.t('createTaskScreen.beginningDateTitle')}: </Text>
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
      {i18n.t('createTaskScreen.dateHelperText')}
      </HelperText>

      <Text style={styles.title}>{i18n.t('createTaskScreen.beginningTimeTitle')}: </Text>
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
      {i18n.t('createTaskScreen.timeHelperText')}
      </HelperText>
      <Button onPress={handleSubmit(onSubmit)} mode='outlined'>
        {i18n.t('createTaskScreen.createTaskButton')}
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
