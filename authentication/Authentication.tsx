// import * as React from 'react';
// import * as SecureStore from 'expo-secure-store';
// import { ChildrenProp } from '../types';
// import AuthButtons from './AuthButtons';
// import { useDispatch, useSelector } from 'react-redux';
// import { logIn } from '../redux/LoginReducer';
// import { RootState } from '../redux/MainStore';
// import firebase from 'firebase';
// import { UserInfo } from '../redux/LoginReducer';
// import { Alert } from 'react-native';

// export default function Authentication({ children }: ChildrenProp) {
//   const dispatch = useDispatch();
//   const loginInfo = useSelector((state: RootState) => state.login)

//   const checkIfLogged = async () => {
//     try {
//       if (!process.env.EXPO_AUTH_STATE_KEY) {
//         throw new Error('No EXPO_AUTH_STATE_KEY env');
//       }
  
//       const secretAuthKey = await SecureStore.getItemAsync(
//         process.env.EXPO_AUTH_STATE_KEY
//       );
//       if (secretAuthKey) {
//         const userInfo: UserInfo = JSON.parse(secretAuthKey);
//         dispatch(logIn(userInfo))
//       }
//     }
//     catch(message) {
//       console.log(message);
//     }
//   };

//   React.useEffect(() => {
//     checkIfLogged();
//   }, [])
  
//   return <>{loginInfo.isLogged ? children : <AuthButtons />}</>;
// }

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { ChildrenProp } from '../types';
import GoogleSignInButton from './GoogleAuthentication';

function Authentication({children}: ChildrenProp) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(verifiedUser) {
    setUser(verifiedUser);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <GoogleSignInButton />
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      {children}
    </View>
  );
}
export default Authentication;
