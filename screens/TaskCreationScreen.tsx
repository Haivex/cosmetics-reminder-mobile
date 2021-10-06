//import { getNotifications, storeNotifications } from '../notificationsStorage/asyncStorage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {set} from 'date-fns';
import i18n from 'i18n-js';
import * as React from 'react';
import {Controller, useForm, Validate} from 'react-hook-form';
import {ScrollView, StyleSheet} from 'react-native';
import 'react-native-get-random-values';
import {
  Button,
  Checkbox,
  HelperText,
  Text,
  TextInput,
} from 'react-native-paper';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';
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
import {addTodo, Task} from '../redux/TodosReducer';
import '../translation/config';
import Notifications from 'react-native-push-notification';

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
  const dateRef = React.createRef<HTMLElement>();
  const timeRef = React.createRef<HTMLElement>();
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
    console.log(data);
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
        //console.log(data);
        dispatch(
          addTodo({
            ...dataFromDb,
            date: new firestore.Timestamp(
              dataFromDb.date.seconds,
              dataFromDb.date.nanoseconds,
            ).toDate(),
            id,
          } as SavedTask),
        );
        // Notifications.scheduleLocalNotification({
        //   channelId: 'main',
        //   title: 'Only You',
        //   message: dataFromDb.title,
        //   date: dataFromDb.date.toDate(),
        //   repeatType: dataFromDb.cyclicInterval ? 'time' : undefined,
        //   repeatTime: dataFromDb.cyclicInterval
        //     ? convertCyclicIntervalToSeconds(dataFromDb.cyclicInterval) * 1000
        //     : undefined,
        // });
      })
      .then(() => {
        clearErrors();
        reset(defaultTaskData);
        navigation.navigate('TabTwo');
      });
    // schedulePushNotification({
    //   title: 'Only You',
    //   body: savedTodo.title,
    //   scheduledDate: updateDate(savedTodo.date as Date, {
    //     hours: savedTodo.time.hours,
    //     minutes: savedTodo.time.minutes,
    //   }),
    //   data: savedTodo && savedTodo.cyclicInterval ? savedTodo : undefined,
    // }).then(async (notificationIdentifier) => {
    //   const notifications = await getNotifications();
    //   if (notifications) {
    //     const newNotifications = [
    //       ...notifications,
    //       {
    //         notificationIdentifier: notificationIdentifier,
    //         taskId: savedTodo.id,
    //       },
    //     ];
    //     storeNotifications(newNotifications);
    //   } else {
    //     storeNotifications([
    //       {
    //         notificationIdentifier: notificationIdentifier,
    //         taskId: savedTodo.id,
    //       },
    //     ]);
    //   }
    // });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {i18n.t('createTaskScreen.titleTitle')}:{' '}
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
            placeholder={i18n.t('createTaskScreen.titleInputPlaceholder')}
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
        {i18n.t('createTaskScreen.titleHelperText')}
      </HelperText>

      <Text style={styles.title}>
        {i18n.t('createTaskScreen.beginningDateTitle')}:{' '}
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
        {i18n.t('createTaskScreen.dateHelperText')}
      </HelperText>

      <Text style={styles.title}>
        {i18n.t('createTaskScreen.beginningTimeTitle')}:{' '}
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
        {i18n.t('createTaskScreen.timeHelperText')}
      </HelperText>
      <Checkbox.Item
        label={i18n.t('createTaskScreen.cyclicQuestion')}
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
            validate: checkIfCyclicInterval as Validate<
              string | number | Time | CalendarDate | CyclicInterval
            >,
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
        {i18n.t('createTaskScreen.cyclicHelperText')}
      </HelperText>
      <Button onPress={handleSubmit(onSubmit)} mode="outlined">
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
