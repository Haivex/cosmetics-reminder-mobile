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
import ErrorDialog from '../components/ErrorDialog';
import TimePickerInput, {Time} from '../components/TimePickerInput';
import {checkIfCyclicInterval} from '../helpers/intervalHelpers';
import '../translation/config';
import {translate} from '../translation/config';
import {NavigationProps, RootStackParamList} from '../types';

export type TaskData = {
  date: CalendarDate;
  time: Time;
  title: string;
  cyclicInterval?: CyclicInterval;
};

interface TaskFormProps extends NavigationProps {
  taskData?: TaskData;
  submitText: string;
  submitCallback: (data: TaskData) => Promise<unknown>;
  navigateTo?: keyof RootStackParamList;
}

export default function TaskForm({
  navigation,
  taskData,
  submitText,
  submitCallback,
  navigateTo,
}: TaskFormProps) {
  const [error, setError] = React.useState('');
  const defaultTaskData: Partial<TaskData> = {
    cyclicInterval: taskData?.cyclicInterval,
    date: taskData?.date,
    time: {
      hours: taskData?.date?.getHours(),
      minutes: taskData?.date?.getMinutes(),
    },
    title: taskData?.title,
  };
  const [isCyclicCheckboxChecked, setCyclic] = React.useState(
    taskData?.cyclicInterval ? true : false,
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
    submitCallback(data)
      .then(() => {
        clearErrors();
        reset(defaultTaskData);
        if (navigateTo) {
          navigation.navigate(navigateTo);
          return;
        }
        navigation.goBack();
      })
      .catch(catchedError => {
        console.error('Task Form Error:', catchedError);
        setError(catchedError);
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
        {submitText}
      </Button>
      {Boolean(error) && (
        <ErrorDialog
          error={error}
          title="Task Form Error!"
          description="Cannot submit form! Try again later"
        />
      )}
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