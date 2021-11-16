import React from 'react';
import {Switch} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {toggleNotificationsStatus} from '../redux/NotificationsReducer';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectNotificationsStatus} from '../redux/selectors';

const NotificationsStatus = () => {
  const state = useTrackedSelector();
  const dispatch = useDispatch();

  const notificationsStatus = selectNotificationsStatus(state);

  const onToggleSwitch = () => {
    dispatch(toggleNotificationsStatus(notificationsStatus));
  };

  return <Switch value={notificationsStatus} onValueChange={onToggleSwitch} />;
};

export default NotificationsStatus;
