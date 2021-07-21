import * as Facebook from 'expo-facebook';
import * as React from 'react';
import { Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const FacebookAuthentication = () => {
  async function logIn() {
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

        const storageValue = JSON.stringify({
            authProvider: 'FACEBOOK',
            authData: {
                token,
                userId,
            }
        })

        SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, storageValue);

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <Button
      title='Login with facebook'
      onPress={() => {
        logIn();
      }}
    />
  );
};

export default FacebookAuthentication;
