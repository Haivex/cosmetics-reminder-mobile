import React from 'react';
import 'react-native-get-random-values';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';
import {CyclicInterval} from '../components/taskForm/inputs/CyclicTaskInputs';
import TaskForm from '../components/taskForm/TaskForm';
import {Time} from '../components/taskForm/inputs/TimePickerInput';
import {saveTask} from '../firebase/saveTask';
import '../translation/config';
import {translate} from '../translation/config';
import {NavigationProps} from '../components/navigation/types';
import TaskNotifications from '../shared/TaskNotifications';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectNotificationsStatus} from '../redux/selectors';
import {
  convertTaskFormDataToTaskCreationData,
  convertTaskDocumentToTask,
} from '../helpers/converters';

export type TaskData = {
  date: CalendarDate;
  time: Time;
  title: string;
  cyclicInterval?: CyclicInterval;
};

export default function TaskCreationScreen({
  route,
  navigation,
}: NavigationProps) {
  const state = useTrackedSelector();
  const areNotificationsTurnedOn = selectNotificationsStatus(state);
  const onSubmit = (data: TaskData) => {
    const taskCreationData = convertTaskFormDataToTaskCreationData(data);
    return saveTask(taskCreationData).then(taskDocumentFromDatabase => {
      if (areNotificationsTurnedOn) {
        const createdTask = convertTaskDocumentToTask(taskDocumentFromDatabase);
        TaskNotifications.createNotification(createdTask);
      }
    });
  };

  return (
    <TaskForm
      submitText={translate('createTaskScreen.createTaskButton')}
      submitCallback={onSubmit}
      route={route}
      navigation={navigation}
      navigateTo="TabTwo"
    />
  );
}
