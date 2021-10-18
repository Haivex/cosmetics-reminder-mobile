import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/RootReducer';
import {checkPermissions} from '../redux/NotificationsReducer';
import {fetchUserTasks} from '../redux/TodosReducer';
import {logIn} from '../redux/UserReducer';
import {ChildrenProp} from '../types';
import GoogleSignInButton from './GoogleAuthentication';

let isCalledOnce = false;

function Authentication({children}: ChildrenProp) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const user = useSelector((state: RootState) => state.currentUser.data);
  const dispatch = useDispatch();

  // Handle user state changes
  function onAuthStateChanged(userOrNull: FirebaseAuthTypes.User | null) {
    dispatch(logIn(userOrNull));
    if (userOrNull && !isCalledOnce) {
      dispatch(fetchUserTasks());
      dispatch(checkPermissions());
      isCalledOnce = true;
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <View>
        <GoogleSignInButton />
      </View>
    );
  }

  return <>{children}</>;
}
export default Authentication;
