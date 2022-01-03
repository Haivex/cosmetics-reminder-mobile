import * as React from 'react';
import 'react-native-get-random-values';
import {NavigationProps} from '../components/navigation/types';
import TaskForm from '../components/taskForm/TaskForm';
import {editTask} from '../firebase/editTask';
import {
  convertTaskCreationDataToUpdatedTask,
  convertTaskFormDataToTaskCreationData,
} from '../helpers/converters';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectNotificationsStatus} from '../redux/selectors';
import Logger from '../shared/Logger';
import TaskNotifications from '../shared/TaskNotifications';
import '../translation/config';
import {translate} from '../translation/config';
import {TaskData} from './TaskCreationScreen';

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
    return editTask(task.id, taskCreationData)
      .then(() => {
        Logger.info('Task with given id has been updated', task.id);
        if (areNotificationsTurnedOn) {
          const editedTask = convertTaskCreationDataToUpdatedTask(
            taskCreationData,
            task,
          );
          TaskNotifications.cancelNotification(task);
          TaskNotifications.createNotification(editedTask);
        }
      })
      .catch(catchedError =>
        Logger.warn(
          `Failed to update task with given id ${task.id}`,
          catchedError,
        ),
      );
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
