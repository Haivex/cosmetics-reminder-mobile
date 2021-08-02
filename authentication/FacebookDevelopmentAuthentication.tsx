import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { UserInfo, logIn } from '../redux/LoginReducer';
import { useDispatch } from 'react-redux';
import { registration } from '../firebase/registration';
import firebase from 'firebase';
import doesUserExist from '../firebase/doesUserExist';

WebBrowser.maybeCompleteAuthSession();

export default function FacebookDevelopmentAuthentication() {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    expoClientId: process.env.FACEBOOK_EXPO_CLIENT_ID,
    //androidClientId: process.env.FACEBOOK_EXPO_CLIENT_ID,
    //clientId: process.env.FACEBOOK_EXPO_CLIENT_ID,
    responseType: ResponseType.Token,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;

      if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
        throw new Error('No EXPO_AUTH_STATE_KEY env');
      }

      const loginInfo: UserInfo = {
        authProvider: 'FACEBOOK',
        authData: {
          credential: access_token,
        },
      };

      const storageValue = JSON.stringify(loginInfo);

      SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, storageValue);
      dispatch(logIn(loginInfo));

      const firebaseLogin = async () => {
        const credential =
          firebase.auth.FacebookAuthProvider.credential(access_token);
        await firebase.auth().signInWithCredential(credential);

        const currentUser = firebase.auth().currentUser;

        const isUserRegistred = await doesUserExist(
          currentUser?.email as string
        );

        if (!isUserRegistred) {
          registration(currentUser as firebase.User);
        }
      };
      firebaseLogin();
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title='Login with Facebook'
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
