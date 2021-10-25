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
import CyclicTaskInputs, {CyclicInterval} from '../components/CyclicTaskInputs';
import DatePickerInput from '../components/DatePickerInput';
import TimePickerInput, {Time} from '../components/TimePickerInput';
import {editTask} from '../firebase/editTask';
import {checkIfCyclicInterval} from '../helpers/intervalHelpers';
import '../translation/config';
import {translate} from '../translation/config';
import {NavigationProps} from '../types';
import {TaskData} from './TaskCreationScreen';
export default function TaskEditionScreen({
  route,
  navigation,
}: NavigationProps) {
  const task = route.params;
  const defaultTaskData: TaskData = {
    cyclicInterval: task.cyclicInterval,
    date: task.date.toDate(),
    time: {
      hours: task.date.toDate().getHours(),
      minutes: task.date.toDate().getMinutes(),
    },
    title: task.title,
  };
  const [isCyclicCheckboxChecked, setCyclic] = React.useState(
    task.cyclicInterval ? true : false,
  );
  const dateRef = React.createRef<TextInputType>();
  const timeRef = React.createRef<TextInputType>();
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
    editTask(task.id, taskDataWithoutTime).then(() => {
      clearErrors();
      reset(defaultTaskData);
      navigation.goBack();
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
        {translate('editTaskScreen.confirmButton')}
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
