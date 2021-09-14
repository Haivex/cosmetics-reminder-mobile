import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';
import { Alert, Button } from 'react-native';
import { UserInfo, logIn } from '../redux/LoginReducer';
import { useDispatch } from 'react-redux';
import doesUserExist from '../firebase/doesUserExist';
import { registration } from '../firebase/registration';
import config from '../firebase/config';

//  const GoogleAuthentication = () => {
//     const [user, setUser] = React.useState<GoogleSignIn.GoogleUser | null>(null);
//     const dispatch = useDispatch();

//     const _syncUserWithStateAsync = async () => {
//         const user = await GoogleSignIn.signInSilentlyAsync();
//         setUser(user);

//         if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
//             throw new Error('No EXPO_AUTH_STATE_KEY env');
//           }

//           const loginInfo: UserInfo = {
//             authProvider: 'GOOGLE',
//             authData: {
//                 user,
//             }
//         }

//           const storageValue = JSON.stringify(loginInfo)

//           SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, storageValue);
//           dispatch(logIn(loginInfo));
//       };

//     const initAsync = async () => {
//         await GoogleSignIn.initAsync({
//           clientId: process.env.GOOGLE_IOS_CLIENT_ID,

//         });
//         _syncUserWithStateAsync();
//       };

//     React.useEffect(() => {
//         initAsync();
//     }, [])

//   const signOutAsync = async () => {
//     await GoogleSignIn.signOutAsync();
//     setUser(null);

//     if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
//         throw new Error('No EXPO_AUTH_STATE_KEY env');
//     }

//       SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, "");
//   };

//   const signInAsync = async () => {
//     try {
//       await GoogleSignIn.askForPlayServicesAsync();
//       const { type, user } = await GoogleSignIn.signInAsync();
//       if (type === 'success') {
//         _syncUserWithStateAsync();
//       }
//     } catch ({ message }) {
//       Alert.alert('login: Error:' + message);
//     }
//   };

//     return (<Button title="Login with Google" onPress={signInAsync} />)
// }

if (!firebase.apps.length) {
  firebase.initializeApp({
    ...config.firebaseWebConfig
  });
}

WebBrowser.maybeCompleteAuthSession();

const GoogleAuthentication = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.FIREBASE_WEB_CLIENT_ID,
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    let componentMounted = true;
    if (response?.type === 'success') {
      const firebaseLogin = async () => {
        try {
          const { id_token } = response.params;

          const loginInfo: UserInfo = {
            authProvider: 'GOOGLE',
            authData: {},
          };

          const storageValue = JSON.stringify(loginInfo);

          if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
            throw new Error('No EXPO_AUTH_STATE_KEY env');
          }

          await SecureStore.setItemAsync(
            process.env.EXPO_AUTH_STATE_KEY,
            storageValue
          );

          const credential =
            firebase.auth.GoogleAuthProvider.credential(id_token);
          await firebase.auth().signInWithCredential(credential);

          const currentUser = firebase.auth().currentUser;

          const isUserRegistred = await doesUserExist(
            currentUser?.email as string
          );

          if (!isUserRegistred) {
            await registration(currentUser as firebase.User);
          }

          dispatch(logIn(loginInfo));
        } catch (message) {
          Alert.alert(`Google Login Error: ${message}`);
          console.log(message);
        }
      };
      firebaseLogin();
    }
    return () => {
      componentMounted = false;
    };
  }, [response]);

  return (
    <Button
      disabled={!request}
      title='Login'
      onPress={() => {
        promptAsync();
      }}
    />
  );
};

export default GoogleAuthentication;
function dispatch(arg0: { payload: UserInfo; type: string; }) {
    throw new Error('Function not implemented.');
}

