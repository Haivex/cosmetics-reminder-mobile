import {set} from 'date-fns';
import * as React from 'react';
import 'react-native-get-random-values';
import TaskForm from '../components/taskForm/TaskForm';
import {editTask} from '../firebase/editTask';
import '../translation/config';
import {translate} from '../translation/config';
import {NavigationProps} from '../components/navigation/types';
import {TaskData} from './TaskCreationScreen';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectNotificationsStatus} from '../redux/selectors';
import TaskNotifications from '../shared/TaskNotifications';
import {Task} from '../types';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {
  convertTaskCreationDataToUpdatedTask,
  convertTaskFormDataToTaskCreationData,
} from '../helpers/converters';

export default function TaskEditionScreen({
  route,
  navigation,
}: NavigationProps) {
  const state = useTrackedSelector();
  const areNotificationsTurnedOn = selectNotificationsStatus(state);
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

  const onSubmit = (data: TaskData) => {
    const taskCreationData = convertTaskFormDataToTaskCreationData(data);
    return editTask(task.id, taskCreationData).then(() => {
      if (areNotificationsTurnedOn) {
        const editedTask = convertTaskCreationDataToUpdatedTask(
          taskCreationData,
          task,
        );
        TaskNotifications.cancelNotification(task);
        TaskNotifications.createNotification(editedTask);
      }
    });
  };

  return (
    <TaskForm
      submitText={translate('editTaskScreen.confirmButton')}
      submitCallback={onSubmit}
      taskData={defaultTaskData}
      route={route}
      navigation={navigation}
    />
  );
}
