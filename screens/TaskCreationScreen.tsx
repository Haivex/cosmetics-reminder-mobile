import React from 'react';
import 'react-native-get-random-values';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';
import {NavigationProps} from '../components/navigation/types';
import {CyclicInterval} from '../components/taskForm/inputs/CyclicTaskInputs';
import {Time} from '../components/taskForm/inputs/TimePickerInput';
import TaskForm from '../components/taskForm/TaskForm';
import {saveTask} from '../firebase/saveTask';
import {
  convertTaskDocumentToTask,
  convertTaskFormDataToTaskCreationData,
} from '../helpers/converters';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectNotificationsStatus} from '../redux/selectors';
import Logger from '../shared/Logger';
import TaskNotifications from '../shared/TaskNotifications';
import {translate} from '../translation/config';

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
    return saveTask(taskCreationData)
      .then(taskDocumentFromDatabase => {
        Logger.info('Saved task in database', taskDocumentFromDatabase);
        if (areNotificationsTurnedOn) {
          const createdTask = convertTaskDocumentToTask(
            taskDocumentFromDatabase,
          );
          TaskNotifications.createNotification(createdTask);
        }
      })
      .catch(catchedError =>
        Logger.warn(
          `Failed to create task with data ${JSON.stringify(taskCreationData)}`,
          catchedError,
        ),
      );
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
