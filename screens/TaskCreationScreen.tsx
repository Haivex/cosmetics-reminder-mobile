import {useNavigation} from '@react-navigation/native';
import {set} from 'date-fns';
import * as React from 'react';
import {Controller, useForm, Validate} from 'react-hook-form';
import {ScrollView, StyleSheet, TextInput as TextInputType} from 'react-native';
import 'react-native-get-random-values';
import {
  Button,
  Checkbox,
  HelperText,
  Text,
  TextInput,
} from 'react-native-paper';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';
import Notifications from 'react-native-push-notification';
import {useDispatch} from 'react-redux';
import CyclicTaskInputs, {CyclicInterval} from '../components/CyclicTaskInputs';
import DatePickerInput from '../components/DatePickerInput';
import TimePickerInput, {Time} from '../components/TimePickerInput';
import {TaskDocument} from '../firebase/firestoreTypes';
import {saveTask} from '../firebase/saveTask';
import {
  checkIfCyclicInterval,
  convertCyclicIntervalToSeconds,
} from '../helpers/intervalHelpers';
import {addNotification} from '../redux/NotificationsReducer';
import '../translation/config';
import {translate} from '../translation/config';
import {Task} from '../types';
export type TaskData = {
  date: CalendarDate;
  time: Time;
  title: string;
  cyclicInterval?: CyclicInterval;
};

export interface SavedTask extends Task {
  id: string;
}

const defaultTaskData: TaskData = {
  cyclicInterval: undefined,
  date: undefined,
  time: {
    hours: undefined,
    minutes: undefined,
  },
  title: '',
};

export default function TaskCreationScreen() {
  const navigation = useNavigation();
  const [isCyclicCheckboxChecked, setCyclic] = React.useState(false);
  const dateRef = React.createRef<TextInputType>();
  const timeRef = React.createRef<TextInputType>();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
    clearErrors,
    reset,
    getValues,
  } = useForm<TaskData>({
    defaultValues: defaultTaskData,
  });

  const onSubmit = (data: TaskData) => {
    data.cyclicInterval = isCyclicCheckboxChecked
      ? data.cyclicInterval
      : undefined;
    const mergedDateAndTime = set(data.date as Date, data.time);
    const taskDataWithoutTime = {
      ...data,
      date: mergedDateAndTime,
      time: undefined,
    };
    saveTask(taskDataWithoutTime)
      .then(savedTask => {
        const id = savedTask.id;
        const dataFromDb = savedTask.data() as TaskDocument;
        // dispatch(
        //   addTodo({
        //     ...dataFromDb,
        //     timestamp: new firestore.Timestamp(
        //       dataFromDb.date.seconds,
        //       dataFromDb.date.nanoseconds,
        //     ).toMillis(),
        //     id,
        //   } as SavedTask),
        // );
        const notificationCreationTimestamp = Date.now();
        Notifications.localNotificationSchedule({
          channelId: 'main',
          id: notificationCreationTimestamp,
          title: 'Only You',
          message: dataFromDb.title,
          date: dataFromDb.date.toDate(),
          allowWhileIdle: false,
          repeatType: dataFromDb.cyclicInterval ? 'time' : undefined,
          repeatTime: dataFromDb.cyclicInterval
            ? convertCyclicIntervalToSeconds(dataFromDb.cyclicInterval) * 1000
            : 1,
        });
        const notificationToStore = {
          taskId: id,
          notificationId: notificationCreationTimestamp,
        };
        dispatch(addNotification(notificationToStore));
      })
      .then(() => {
        clearErrors();
        reset(defaultTaskData);
        navigation.navigate('TabTwo');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {translate('createTaskScreen.titleTitle')}:{' '}
      </Text>
      <Controller<TaskData>
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={textValue => onChange(textValue)}
            value={value as string}
            mode="outlined"
            placeholder={translate('createTaskScreen.titleInputPlaceholder')}
            // autoFocus
            onSubmitEditing={() =>
              !getValues().date && dateRef?.current?.focus()
            }
            returnKeyType="go"
            returnKeyLabel="go"
            clearButtonMode="while-editing"
            enablesReturnKeyAutomatically
          />
        )}
        name="title"
      />
      <HelperText type="error" visible={errors.title ? true : false}>
        {translate('createTaskScreen.titleHelperText')}
      </HelperText>

      <Text style={styles.title}>
        {translate('createTaskScreen.beginningDateTitle')}:{' '}
      </Text>
      <Controller<TaskData>
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onBlur, onChange, value}}) => (
          <DatePickerInput
            ref={dateRef}
            onBlur={onBlur}
            onChange={params => {
              onChange(params);
              !getValues().time.hours && timeRef?.current?.focus();
            }}
            value={value as CalendarDate}
          />
        )}
        name="date"
      />
      <HelperText type="error" visible={errors.date ? true : false}>
        {translate('createTaskScreen.dateHelperText')}
      </HelperText>

      <Text style={styles.title}>
        {translate('createTaskScreen.beginningTimeTitle')}:{' '}
      </Text>
      <Controller<TaskData>
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onBlur, onChange, value}}) => (
          <TimePickerInput
            ref={timeRef}
            onBlur={onBlur}
            onChange={onChange}
            value={value as Time}
          />
        )}
        name="time"
      />
      <HelperText type="error" visible={errors.time ? true : false}>
        {translate('createTaskScreen.timeHelperText')}
      </HelperText>
      <Checkbox.Item
        label={translate('createTaskScreen.cyclicQuestion')}
        status={isCyclicCheckboxChecked ? 'checked' : 'unchecked'}
        onPress={() => {
          setCyclic(!isCyclicCheckboxChecked);
        }}
      />
      {isCyclicCheckboxChecked && (
        <Controller<TaskData>
          control={control}
          rules={{
            required: isCyclicCheckboxChecked,
            validate: checkIfCyclicInterval as Validate<unknown>,
          }}
          render={({field: {onBlur, onChange, value}}) => (
            <CyclicTaskInputs
              onChange={onChange}
              onBlur={onBlur}
              value={value as CyclicInterval}
            />
          )}
          name="cyclicInterval"
        />
      )}
      <HelperText
        type="error"
        visible={
          isCyclicCheckboxChecked && errors.cyclicInterval ? true : false
        }>
        {translate('createTaskScreen.cyclicHelperText')}
      </HelperText>
      <Button onPress={handleSubmit(onSubmit)} mode="outlined">
        {translate('createTaskScreen.createTaskButton')}
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
