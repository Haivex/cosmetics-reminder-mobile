import * as React from 'react';
import * as ExpoAppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { UserInfo, logIn } from '../redux/LoginReducer';
import firebase from 'firebase';
import { registration } from '../database/registration';

export default function AppleAuthentication() {
  const dispatch = useDispatch();
  return (
    <ExpoAppleAuthentication.AppleAuthenticationButton
      buttonType={ExpoAppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={ExpoAppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: 200, height: 44 }}
      onPress={async () => {
        let provider = new firebase.auth.OAuthProvider('apple.com');

        provider.addScope('email');
        provider.addScope('name');

        provider.setCustomParameters({
          // Localize the Apple authentication screen in French.
          locale: 'en',
        });

        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;

            if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
              throw new Error('No EXPO_AUTH_STATE_KEY env');
            }

            const loginInfo: UserInfo = {
              authProvider: 'APPLE',
              authData: {
                credential,
                user,
              },
            };

              const storageValue = JSON.stringify(loginInfo);

              SecureStore.setItemAsync(
                process.env.EXPO_AUTH_STATE_KEY,
                storageValue
              );
              dispatch(logIn(loginInfo));

            if (/*!account*/ null) {
              registration(loginInfo);
            } else {
              firebase.auth().signInWithRedirect(provider);
            }
          });

        // try {
        //   const credential = await ExpoAppleAuthentication.signInAsync({
        //     requestedScopes: [
        //       ExpoAppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        //       ExpoAppleAuthentication.AppleAuthenticationScope.EMAIL,
        //     ],
        //   });
        //   // signed in
        //   //console.log('Successful logged: ', credential.user);

        //   if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
        //     throw new Error('No EXPO_AUTH_STATE_KEY env');
        //   }

        //   const loginInfo: UserInfo = {
        //     authProvider: 'APPLE',
        //     authData: {
        //       credential,
        //     },
        //   };

        //   const storageValue = JSON.stringify(loginInfo);

        //   SecureStore.setItemAsync(
        //     process.env.EXPO_AUTH_STATE_KEY,
        //     storageValue
        //   );
        //   dispatch(logIn(loginInfo));
        // } catch (e) {
        //   if (e.code === 'ERR_CANCELED') {
        //     // handle that the user canceled the sign-in flow
        //   } else {
        //     // handle other errors
        //   }
        // }
      }}
    />
  );
}
