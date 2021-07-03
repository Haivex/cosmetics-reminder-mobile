import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, Text, HelperText, Checkbox } from 'react-native-paper';
import DatePickerInput from '../components/DatePickerInput';
import TimePickerInput from '../components/TimePickerInput';
import { useForm, Controller, Validate } from 'react-hook-form';
import { addTodo } from '../redux/TodosReducer';
import { useDispatch } from 'react-redux';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';
import {schedulePushNotification} from '../components/NotificationWrapper';
import { set } from 'date-fns';
import '../translation/config';
import i18n from 'i18n-js';
import CyclicTaskInputs, { CyclicInterval } from '../components/CyclicTaskInputs';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export type Time = {
  hours: number | undefined;
  minutes: number | undefined;
};

export type TaskData = {
  date: CalendarDate;
  time: Time;
  title: string;
  cyclicInterval?: CyclicInterval
};

export interface SavedTask extends TaskData {
  id: string;
}

const defaultTaskData: TaskData = {
  cyclicInterval: undefined,
  date: undefined,
  time: {
    hours: undefined,
    minutes: undefined,
  },
  title: "",
}


const validateCyclicInterval = (value: CyclicInterval | undefined) => {
  return (value && (value.days > 0 || value.hours > 0 || value.minutes > 0))
}

export default function TabOneScreen() {
  const [isCyclic, setCyclic] = React.useState(false);
  const dateRef = React.createRef();
  const timeRef = React.createRef();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors,  },
    clearErrors,
    reset,
    getValues
  } = useForm<TaskData>({
    defaultValues: defaultTaskData
  });

  const onSubmit = (data: TaskData) => {
    const savedTodo = {...data, id: uuidv4()}
    dispatch(addTodo(savedTodo));
    schedulePushNotification({
      title: 'Only You',
      body: savedTodo.title,
      scheduledDate: set(savedTodo.date as Date, {
        hours: savedTodo.time.hours,
        minutes: savedTodo.time.minutes
      }),
      data: savedTodo && savedTodo.cyclicInterval ? savedTodo : undefined
    })
    clearErrors(),
    reset(defaultTaskData)
  };

  return (
    <ScrollView style={styles.container}>
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
            autoFocus
            onSubmitEditing={() => !getValues().date && dateRef.current.focus()}
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
        render={({ field: { onBlur, onChange, value } }) => (
          <DatePickerInput ref={dateRef} onBlur={onBlur} onChange={(params) => {onChange(params); !getValues().time.hours  && timeRef.current.focus()} } value={value as CalendarDate} />
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
        render={({ field: { onBlur, onChange, value } }) => (
          <TimePickerInput ref={timeRef} onBlur={onBlur} onChange={onChange} value={value as Time} />
        )}
        name='time'
      />
      <HelperText type='error' visible={errors.time ? true : false}>
      {i18n.t('createTaskScreen.timeHelperText')}
      </HelperText>
      <Checkbox.Item
      label={i18n.t('createTaskScreen.cyclicQuestion')}
      status={isCyclic ? 'checked' : 'unchecked'}
      onPress={() => {
        setCyclic(!isCyclic);
      }}
      />
      {isCyclic && <Controller<TaskData>
        control={control}
        rules={{
          required: isCyclic,
          validate: validateCyclicInterval as Validate<string | number | Time | CalendarDate | CyclicInterval>
        }}
        render={({ field: { onBlur, onChange, value} }) => (
          <CyclicTaskInputs onChange={onChange} onBlur={onBlur} value={value as CyclicInterval} />
        )}
        name='cyclicInterval'
      />}
      <HelperText type='error' visible={isCyclic && errors.cyclicInterval ? true : false}>{i18n.t('createTaskScreen.cyclicHelperText')}</HelperText>
      <Button onPress={handleSubmit(onSubmit)} mode='outlined'>
        {i18n.t('createTaskScreen.createTaskButton')}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
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
