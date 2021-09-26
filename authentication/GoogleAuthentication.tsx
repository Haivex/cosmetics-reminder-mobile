// import * as React from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import { ResponseType } from 'expo-auth-session';
// import * as Google from 'expo-auth-session/providers/google';
// import firebase from 'firebase';
// import * as SecureStore from 'expo-secure-store';
// import { Alert, Button } from 'react-native';
// import { UserInfo, logIn } from '../redux/LoginReducer';
// import { useDispatch } from 'react-redux';
// import doesUserExist from '../firebase/doesUserExist';
// import { registration } from '../firebase/registration';
// import config from '../firebase/config';
// import * as constants from 'expo-constants';
// //  const GoogleAuthentication = () => {
// //     const [user, setUser] = React.useState<GoogleSignIn.GoogleUser | null>(null);
// //     const dispatch = useDispatch();

// //     const _syncUserWithStateAsync = async () => {
// //         const user = await GoogleSignIn.signInSilentlyAsync();
// //         setUser(user);

// //         if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
// //             throw new Error('No EXPO_AUTH_STATE_KEY env');
// //           }

// //           const loginInfo: UserInfo = {
// //             authProvider: 'GOOGLE',
// //             authData: {
// //                 user,
// //             }
// //         }

// //           const storageValue = JSON.stringify(loginInfo)

// //           SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, storageValue);
// //           dispatch(logIn(loginInfo));
// //       };

// //     const initAsync = async () => {
// //         await GoogleSignIn.initAsync({
// //           clientId: process.env.GOOGLE_IOS_CLIENT_ID,

// //         });
// //         _syncUserWithStateAsync();
// //       };

// //     React.useEffect(() => {
// //         initAsync();
// //     }, [])

// //   const signOutAsync = async () => {
// //     await GoogleSignIn.signOutAsync();
// //     setUser(null);

// //     if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
// //         throw new Error('No EXPO_AUTH_STATE_KEY env');
// //     }

// //       SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, "");
// //   };

// //   const signInAsync = async () => {
// //     try {
// //       await GoogleSignIn.askForPlayServicesAsync();
// //       const { type, user } = await GoogleSignIn.signInAsync();
// //       if (type === 'success') {
// //         _syncUserWithStateAsync();
// //       }
// //     } catch ({ message }) {
// //       Alert.alert('login: Error:' + message);
// //     }
// //   };

// //     return (<Button title="Login with Google" onPress={signInAsync} />)
// // }

// const configToUse = constants.default.platform?.android ? config.firebaseAndroidConfig : config.firebaseWebConfig;

// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     ...configToUse
//   });
// }

// WebBrowser.maybeCompleteAuthSession();

// const GoogleAuthentication = () => {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     //clientId: process.env.FIREBASE_WEB_CLIENT_ID,
//     androidClientId: process.env.ANDROID_CLIENT_ID,
//     //iosClientId: process.env.IOS_CLIENT_ID,
//     //expoClientId: process.env.EXPO_CLIENT_ID
//     //webClientId: process.env.WEB_CLIENT_ID,
//     clientSecret: process.env.FIREBASE_WEB_CLIENT_SECRET,
//     //redirectUri
//   });
//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     let componentMounted = true;
//     if (response?.type === 'success') {
//       const firebaseLogin = async () => {
//         try {
//           const { id_token } = response.params;

//           const loginInfo: UserInfo = {
//             authProvider: 'GOOGLE',
//             authData: {},
//           };

//           const storageValue = JSON.stringify(loginInfo);

//           if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
//             throw new Error('No EXPO_AUTH_STATE_KEY env');
//           }

//           await SecureStore.setItemAsync(
//             process.env.EXPO_AUTH_STATE_KEY,
//             storageValue
//           );

//           const credential =
//             firebase.auth.GoogleAuthProvider.credential(id_token);
//           await firebase.auth().signInWithCredential(credential);

//           const currentUser = firebase.auth().currentUser;

//           const isUserRegistred = await doesUserExist(
//             currentUser?.email as string
//           );

//           if (!isUserRegistred) {
//             await registration(currentUser as firebase.User);
//           }

//           dispatch(logIn(loginInfo));
//         } catch (message) {
//           Alert.alert(`Google Login Error: ${message}`);
//           console.log(message);
//         }
//       };
//       firebaseLogin();
//     }
//     return () => {
//       componentMounted = false;
//     };
//   }, [response]);

//   return (
//     <Button
//       disabled={!request}
//       title='Login'
//       onPress={() => {
//         promptAsync();
//       }}
//     />
//   );
// };

// export default GoogleAuthentication;

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Button} from 'react-native';

GoogleSignin.configure({
  webClientId: '',
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function GoogleSignInButton() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  );
}

export default GoogleSignInButton;
