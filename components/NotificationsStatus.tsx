import React from 'react';
import {Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/MainStore';
import {toggleNotificationsStatus} from '../redux/NotificationsReducer';

const NotificationsStatus = () => {
  const notificationsStatus = useSelector(
    (state: RootState) => state.notifications.notificationsStatus,
  );
  const dispatch = useDispatch();

  const onToggleSwitch = () => {
    dispatch(toggleNotificationsStatus(notificationsStatus));
  };

  return <Switch value={notificationsStatus} onValueChange={onToggleSwitch} />;
};

export default NotificationsStatus;
