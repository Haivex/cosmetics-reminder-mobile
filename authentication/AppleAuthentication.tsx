import * as React from 'react';
import * as ExpoAppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { AuthInfo, logIn } from '../redux/LoginReducer';

export default function AppleAuthentication() {
  const dispatch = useDispatch();
  return (
    <ExpoAppleAuthentication.AppleAuthenticationButton
      buttonType={ExpoAppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={ExpoAppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: 200, height: 44 }}
      onPress={async () => {
        try {
          const credential = await ExpoAppleAuthentication.signInAsync({
            requestedScopes: [
              ExpoAppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              ExpoAppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          // signed in
          //console.log('Successful logged: ', credential.user);

          if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
            throw new Error('No EXPO_AUTH_STATE_KEY env');
          }

          const loginInfo: AuthInfo = {
            authProvider: 'APPLE',
            authData: {
                credential,
            }
        }
  
          const storageValue = JSON.stringify(loginInfo)
  
          SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, storageValue);
          dispatch(logIn(loginInfo))

        } catch (e) {
          if (e.code === 'ERR_CANCELED') {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
    />
  );
}
