import * as Facebook from 'expo-facebook';
import * as React from 'react';
import { Alert, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { UserInfo, logIn } from '../redux/UserReducer';

const FacebookAuthentication = () => {
  const dispatch = useDispatch();
  async function facebookLogIn() {
    try {
      await Facebook.initializeAsync({
        appId: process.env.FACEBOOK_APP_ID,
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
        userId,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        //console.log('Logged in!', `Hi ${(await response.json()).name}!`);

        if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
          throw new Error('No EXPO_AUTH_STATE_KEY env');
        }

        const loginInfo: UserInfo = {
          authProvider: 'FACEBOOK',
          authData: {
              userId,
          }
      }

        const storageValue = JSON.stringify(loginInfo)

        SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, storageValue);
        dispatch(logIn(loginInfo))

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <Button
      title='Login with facebook'
      onPress={() => {
        facebookLogIn();
      }}
    />
  );
};

export default FacebookAuthentication;
