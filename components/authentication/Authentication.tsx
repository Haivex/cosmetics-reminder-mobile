import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {auth} from '../../App';
import {getIncomingTasks} from '../../firebase/getIncomingTasks';
import {useTrackedSelector} from '../../redux/RootReducer';
import {
  selectCurrentUser,
  selectNotificationsStatus,
} from '../../redux/selectors';
import {logIn} from '../../redux/UserReducer';
import TaskNotifications from '../../shared/TaskNotifications';
import {ChildrenProp} from '../types';
import FacebookSignInButton from './FacebookAuthenticationButton';
import GoogleSignInButton from './GoogleAuthenticationButton';

export interface AuthButtonProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}

let isCalledOnce = false;

function Authentication({children}: ChildrenProp) {
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const state = useTrackedSelector();
  const user = selectCurrentUser(state);
  const areNotificationsTurnedOn = selectNotificationsStatus(state);

  function onAuthStateChangedCallback(
    userOrNull: FirebaseAuthTypes.User | null,
  ) {
    if (!user) {
      dispatch(logIn(userOrNull));
    }
    if (userOrNull && !isCalledOnce) {
      isCalledOnce = true;
      if (areNotificationsTurnedOn) {
        getIncomingTasks().then(tasks =>
          tasks.forEach(TaskNotifications.createNotification),
        );
      }
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  const onAuthStateChanged = useCallback(onAuthStateChangedCallback, [
    dispatch,
    initializing,
    user,
    areNotificationsTurnedOn,
  ]);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={loading} size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <GoogleSignInButton disabled={loading} setLoading={setLoading} />
        <FacebookSignInButton disabled={loading} setLoading={setLoading} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Authentication;
