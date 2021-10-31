import {set} from 'date-fns';
import * as React from 'react';
import 'react-native-get-random-values';
import TaskForm from '../components/TaskForm';
import {editTask} from '../firebase/editTask';
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

  const onSubmit = (data: TaskData) => {
    data.cyclicInterval = data.cyclicInterval || undefined;
    const mergedDateAndTime = set(data.date as Date, data.time);
    const taskDataWithoutTime = {
      ...data,
      date: mergedDateAndTime,
      time: undefined,
    };
    return editTask(task.id, taskDataWithoutTime);
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
