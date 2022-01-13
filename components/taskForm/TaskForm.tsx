import * as React from 'react';
import {Controller, useForm, Validate} from 'react-hook-form';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput as TextInputType,
} from 'react-native';
import 'react-native-get-random-values';
import {
  Button,
  Checkbox,
  HelperText,
  Text,
  TextInput,
} from 'react-native-paper';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';
import {checkIfCyclicInterval} from '../../helpers/intervalHelpers';
import {translate} from '../../translation/config';
import ErrorDialog from '../dialogs/ErrorDialog';
import {NavigationProps, RootStackParamList} from '../navigation/types';
import CyclicTaskInputs, {CyclicInterval} from './inputs/CyclicTaskInputs';
import DatePickerInput from './inputs/DatePickerInput';
import TimePickerInput, {Time} from './inputs/TimePickerInput';

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
    time:
      taskData?.date?.getHours() && taskData?.date?.getMinutes()
        ? {
            hours: taskData?.date?.getHours(),
            minutes: taskData?.date?.getMinutes(),
          }
        : undefined,
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
    formState: {errors, isSubmitting},
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
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}>
      <View>
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
        <HelperText
          type="error"
          visible={!errors.time?.hours || !errors.time?.minutes ? true : false}>
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
      </View>
      <View>
        <Button
          style={styles.submit}
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          mode="contained">
          {submitText}
        </Button>
      </View>
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
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '84%',
    position: 'relative',
    justifyContent: 'space-between',
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  submit: {
    position: 'relative',
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: 32,
  },
});
