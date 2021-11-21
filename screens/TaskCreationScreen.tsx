import {set} from 'date-fns';
import React from 'react';
import 'react-native-get-random-values';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';
import {CyclicInterval} from '../components/taskForm/inputs/CyclicTaskInputs';
import TaskForm from '../components/taskForm/TaskForm';
import {Time} from '../components/taskForm/inputs/TimePickerInput';
import {TaskDocument} from '../firebase/types';
import {saveTask} from '../firebase/saveTask';
import '../translation/config';
import {translate} from '../translation/config';
import {NavigationProps} from '../components/navigation/types';
import TaskNotifications from '../shared/TaskNotifications';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectNotificationsStatus} from '../redux/selectors';
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
    data.cyclicInterval = data.cyclicInterval || undefined;
    const mergedDateAndTime = set(data.date as Date, data.time);
    const taskDataWithoutTime = {
      ...data,
      date: mergedDateAndTime,
      time: undefined,
    };
    return saveTask(taskDataWithoutTime).then(taskDocumentFromDatabase => {
      if (areNotificationsTurnedOn) {
        const id = taskDocumentFromDatabase.id;
        const taskDataFromDatabase =
          taskDocumentFromDatabase.data() as TaskDocument;
        const task = {
          id,
          ...taskDataFromDatabase,
        };

        TaskNotifications.createNotification(task);
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
