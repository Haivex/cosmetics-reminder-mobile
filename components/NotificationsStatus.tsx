import React from 'react';
import {Switch} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {togglePermission} from '../redux/NotificationsReducer';
import {useTrackedSelector} from '../redux/RootReducer';
import {
  selectCurrentUser,
  selectNotificationsStatus,
  selectTasks,
} from '../redux/selectors';
import {useFirestoreConnect} from 'react-redux-firebase';
import TaskNotifications from '../shared/TaskNotifications';
import {Task} from '../types';

const NotificationsStatus = () => {
  const currentDate = new Date();
  const state = useTrackedSelector();
  const dispatch = useDispatch();

  const user = selectCurrentUser(state);
  const notificationsStatus = selectNotificationsStatus(state);
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
      TaskNotifications.cancelAllNotifications();
    } else {
      incomingTasks.forEach(task => {
        TaskNotifications.createNotification(task as Task);
      });
    }
    dispatch(togglePermission(newValue));
  };

  return <Switch value={notificationsStatus} onValueChange={onToggleSwitch} />;
};

export default NotificationsStatus;
