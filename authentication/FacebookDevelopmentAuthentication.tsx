import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function FacebookDevelopmentAuthentication() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    expoClientId: process.env.FACEBOOK_EXPO_CLIENT_ID,
    //androidClientId: process.env.FACEBOOK_EXPO_CLIENT_ID,
    //clientId: process.env.FACEBOOK_EXPO_CLIENT_ID,
    responseType: ResponseType.Code,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
