// https://docs.expo.io/guides/authentication/#google

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Alert, Button, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { UserInfo, logIn } from '../redux/LoginReducer';
import { registration } from '../firebase/registration';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import doesUserExist from '../firebase/doesUserExist';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleDevelopmentAuthentication() {
  const dispatch = useDispatch();
  if (process.env.EXPO_CLIENT_ID === undefined) {
    throw new Error('No EXPO_CLIENT_ID env');
  }
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: process.env.EXPO_CLIENT_ID,
    // iosClientId:
    androidClientId: process.env.ANDROID_CLIENT_ID,
    // webClientId:,
  });

  React.useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  React.useEffect(() => {
    let componentMounted = true;
    if (response && response.type === 'success') {
      const firebaseLogin = async () => {

        try {


        const { id_token } = response.params;

        const credential = firebase.auth.GoogleAuthProvider.credential(id_token);

        const loginInfo: UserInfo = {
          authProvider: 'GOOGLE',
          authData: {},
        };
  
        const storageValue = JSON.stringify(loginInfo);
  
        if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
          throw new Error('No EXPO_AUTH_STATE_KEY env');
        }
  
        await SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, storageValue);

        
        await firebase
          .auth()
          .signInWithCredential(credential);
        const currentUser = firebase.auth().currentUser;

        const isUserRegistred = await doesUserExist(
          currentUser?.email as string
        );

        if (!isUserRegistred) {
          await registration(currentUser as firebase.User);
        }

        dispatch(logIn(loginInfo));

      } catch(message) {
        Alert.alert(`Google Login Error: ${message}`);
        console.log(message);
      }

      };
      firebaseLogin();
    }
    return () => {
      componentMounted = false;
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title='Login with Google'
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
