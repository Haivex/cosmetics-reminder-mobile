/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
//import {useColorScheme} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import PushNotification from 'react-native-push-notification';
//import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import Authentication from './authentication/Authentication';
import Navigation from './navigation/index';
import {persistor, store} from './redux/MainStore';
import initTranslation from './translation/config';
import {PersistGate} from 'redux-persist/integration/react';
import '@react-native-firebase/firestore';
import {createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//import functions from '@react-native-firebase/functions';

export const firebaseApp = firebase;
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();

if (__DEV__) {
  db.settings({
    cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
    ignoreUndefinedProperties: true,
  });
  db.useEmulator('localhost', 8080);
  auth.useEmulator('http://localhost:9099');
  //functions().useFunctionsEmulator('http://localhost:5001');
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish('');
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },
});

PushNotification.createChannel(
  {
    channelId: 'main', // (required)
    channelName: 'Main', // (required)
    channelDescription: 'Main channel for notifications', // (optional) default: undefined.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
  firebase: firebaseApp,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

initTranslation();

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    // <SafeAreaView style={backgroundStyle}>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <Authentication>
              <Navigation colorScheme="light" />
            </Authentication>
            {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
          </PaperProvider>
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
    // </SafeAreaView>
  );
};

export default App;
