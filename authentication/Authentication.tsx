import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/MainStore';
import {logIn} from '../redux/UserReducer';
import {ChildrenProp} from '../types';
import GoogleSignInButton from './GoogleAuthentication';

function Authentication({children}: ChildrenProp) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const user = useSelector((state: RootState) => state.currentUser.data);
  const dispatch = useDispatch();

  // Handle user state changes
  function onAuthStateChanged(userOrNull: FirebaseAuthTypes.User | null) {
    dispatch(logIn(userOrNull));
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

  return (
    <View>
      <Text>Welcome {user.displayName}</Text>
      {children}
    </View>
  );
}
export default Authentication;
