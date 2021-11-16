import React from 'react';
import {Switch} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
  addNotification,
  clearNotifications,
  togglePermission,
} from '../redux/NotificationsReducer';
import {useTrackedSelector} from '../redux/RootReducer';
import {
  selectCurrentUser,
  selectNotifications,
  selectNotificationsStatus,
  selectTasks,
} from '../redux/selectors';
import Notifications from 'react-native-push-notification';
import {useFirestoreConnect} from 'react-redux-firebase';
import {convertCyclicIntervalToSeconds} from '../helpers/intervalHelpers';

const NotificationsStatus = () => {
  const currentDate = new Date();
  const state = useTrackedSelector();
  const dispatch = useDispatch();

  const user = selectCurrentUser(state);
  const notificationsStatus = selectNotificationsStatus(state);
  const cachedNotifications = selectNotifications(state);
  useFirestoreConnect([
    {
      collection: 'tasks',
      where: [
        ['userUID', '==', user?.uid],
        ['completed', '==', false],
        ['date', '>', currentDate],
      ],
      orderBy: ['date', 'asc'],
      storeAs: 'incomingTasks',
    },
  ]);
  const {incomingTasks} = selectTasks(state);

  const onToggleSwitch = (newValue: boolean) => {
    if (!newValue) {
      Notifications.cancelAllLocalNotifications();
      dispatch(clearNotifications());
    } else {
      incomingTasks.forEach(task => {
        const notificationCreationTimestamp = Date.now();
        console.log(task);
        Notifications.localNotificationSchedule({
          channelId: 'main',
          id: notificationCreationTimestamp,
          title: 'Only You',
          message: task.title,
          date: new Date(task.date.toDate()),
          allowWhileIdle: true,
          repeatType: task.cyclicInterval ? 'time' : undefined,
          repeatTime: task.cyclicInterval
            ? convertCyclicIntervalToSeconds(task.cyclicInterval) * 1000
            : 1,
        });
        const notificationToStore = {
          taskId: task.id,
          notificationId: notificationCreationTimestamp,
        };
        dispatch(addNotification(notificationToStore));
      });
    }
    dispatch(togglePermission(newValue));
  };

  return <Switch value={notificationsStatus} onValueChange={onToggleSwitch} />;
};

export default NotificationsStatus;
