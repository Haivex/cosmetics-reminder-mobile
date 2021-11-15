import {set} from 'date-fns';
import React from 'react';
import 'react-native-get-random-values';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';
import Notifications from 'react-native-push-notification';
import {useDispatch} from 'react-redux';
import {CyclicInterval} from '../components/CyclicTaskInputs';
import TaskForm from '../components/TaskForm';
import {Time} from '../components/TimePickerInput';
import {TaskDocument} from '../firebase/types';
import {saveTask} from '../firebase/saveTask';
import {convertCyclicIntervalToSeconds} from '../helpers/intervalHelpers';
import {addNotification} from '../redux/NotificationsReducer';
import '../translation/config';
import {translate} from '../translation/config';
import {NavigationProps} from '../components/navigation/types';
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
  const dispatch = useDispatch();
  const onSubmit = (data: TaskData) => {
    data.cyclicInterval = data.cyclicInterval || undefined;
    const mergedDateAndTime = set(data.date as Date, data.time);
    const taskDataWithoutTime = {
      ...data,
      date: mergedDateAndTime,
      time: undefined,
    };
    return saveTask(taskDataWithoutTime).then(savedTask => {
      const id = savedTask.id;
      const dataFromDb = savedTask.data() as TaskDocument;
      const notificationCreationTimestamp = Date.now();
      Notifications.localNotificationSchedule({
        channelId: 'main',
        id: notificationCreationTimestamp,
        title: 'Only You',
        message: dataFromDb.title,
        date: dataFromDb.date.toDate(),
        allowWhileIdle: false,
        repeatType: dataFromDb.cyclicInterval ? 'time' : undefined,
        repeatTime: dataFromDb.cyclicInterval
          ? convertCyclicIntervalToSeconds(dataFromDb.cyclicInterval) * 1000
          : 1,
      });
      const notificationToStore = {
        taskId: id,
        notificationId: notificationCreationTimestamp,
      };
      dispatch(addNotification(notificationToStore));
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
