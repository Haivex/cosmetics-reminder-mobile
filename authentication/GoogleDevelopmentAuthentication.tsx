// https://docs.expo.io/guides/authentication/#google

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { UserInfo, logIn } from '../redux/LoginReducer';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleDevelopmentAuthentication() {
  const dispatch = useDispatch();
  if (process.env.EXPO_CLIENT_ID === undefined) {
    throw new Error('No EXPO_CLIENT_ID env');
  }
  const [request, response, promptAsync] = Google.useAuthRequest({
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
    if (response && response.type === 'success') {
      const { authentication } = response;

      const loginInfo: UserInfo = {
        authProvider: 'GOOGLE',
        authData: {
          authentication,
        },
      }

      const storageValue = JSON.stringify(loginInfo);

      if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
        throw new Error('No EXPO_AUTH_STATE_KEY env');
      }

      SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, storageValue);
      dispatch(logIn(loginInfo))

      if (Platform.OS === 'web') {
        WebBrowser.maybeCompleteAuthSession();
      }
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