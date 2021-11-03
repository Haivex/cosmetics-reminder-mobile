import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {checkPermissions} from '../redux/NotificationsReducer';
import {RootState} from '../redux/RootReducer';
import {logIn} from '../redux/UserReducer';
import {ChildrenProp} from '../types';
import FacebookSignInButton from './FacebookAuthentication';
import GoogleSignInButton from './GoogleAuthentication';

let isCalledOnce = false;

function Authentication({children}: ChildrenProp) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const user = useSelector((state: RootState) => state.currentUser.data);
  const dispatch = useDispatch();

  // Handle user state changes
  function onAuthStateChangedCallback(
    userOrNull: FirebaseAuthTypes.User | null,
  ) {
    dispatch(logIn(userOrNull));
    if (userOrNull && !isCalledOnce) {
      dispatch(checkPermissions());
      isCalledOnce = true;
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  const onAuthStateChanged = useCallback(onAuthStateChangedCallback, [
    dispatch,
    initializing,
  ]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <GoogleSignInButton />
        <FacebookSignInButton />
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
