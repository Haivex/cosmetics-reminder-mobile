// https://docs.expo.io/guides/authentication/#google

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ChildrenProp } from '../components/NotificationWrapper';

WebBrowser.maybeCompleteAuthSession();

export default function Authentication({ children }: ChildrenProp) {
  if (process.env.EXPO_CLIENT_ID === undefined) {
    throw new Error('No EXPO_CLIENT_ID env');
  }
  const [isLogged, setLogged] = React.useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_CLIENT_ID,
    // iosClientId:
    androidClientId: process.env.ANDROID_CLIENT_ID,
    // webClientId:,
  });

  React.useEffect(() => {
    const checkIfLogged = async () => {
      if (!process.env.EXPO_AUTH_STATE_KEY) {
        throw new Error('No EXPO_AUTH_STATE_KEY env');
      }

      const secretAuthKey = await SecureStore.getItemAsync(
        process.env.EXPO_AUTH_STATE_KEY
      );
      if (secretAuthKey) {
        setLogged(true);
      }
    };

    checkIfLogged()
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  React.useEffect(() => {
    if (response && response.type === 'success') {
      const { authentication } = response;
      const storageValue = JSON.stringify(authentication);

      if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
        throw new Error('No EXPO_AUTH_STATE_KEY env');
      }

      if (Platform.OS !== 'web') {
        SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, storageValue);
      }

      if (Platform.OS === 'web') {
        WebBrowser.maybeCompleteAuthSession();
      }

      setLogged(true);
    }
  }, [response]);

  return (
    <>
      {isLogged ? (
        children
      ) : (
        <Button
          disabled={!request}
          title='Login'
          onPress={() => {
            promptAsync();
          }}
        />
      )}
    </>
  );
}
