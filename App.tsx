import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import PushNotification from 'react-native-push-notification';
import {Provider} from 'react-redux';
import {
  ReactReduxFirebaseConfig,
  ReactReduxFirebaseProvider,
  ReactReduxFirebaseProviderProps,
} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore';
import {PersistGate} from 'redux-persist/integration/react';
import Authentication from './components/authentication/Authentication';
import Navigation from './components/navigation/index';
import {persistor, store} from './redux/MainStore';
import initializeAppDevSettings from './shared/devSettings';
import Logger from './shared/Logger';
import initTranslation from './translation/config';

export const firebaseApp = firebase;
export const database = firebaseApp.firestore();
export const auth = firebaseApp.auth();

if (__DEV__) {
  Logger.info('Emulators are starting...');

  database.settings({
    persistence: true,
    cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
    ignoreUndefinedProperties: true,
  });
  database.useEmulator('localhost', 8080);
  auth.useEmulator('http://localhost:9099');
  functions().useFunctionsEmulator('http://localhost:5001');
} else {
  global.console.log = () => {
    /* Empty console log in production */
  };
  global.console.warn = () => {
    /* Empty console log in production */
  };
  global.console.error = () => {
    /* Empty console log in production */
  };

  database.settings({
    persistence: true,
    cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
    ignoreUndefinedProperties: true,
  });
}

const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

PushNotification.configure({
  onRegister: function (token) {
    Logger.info('Push notification token:', token);
  },
  onNotification: function (notification) {
    Logger.info('Received notification:', notification);

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish('');
  },
  onAction: function (notification) {
    Logger.info('Called action:', notification.action);
    Logger.info('Action called for notification:', notification);
  },
});

PushNotification.createChannel(
  {
    channelId: 'main',
    channelName: 'Main',
    channelDescription: 'Main channel for notifications',
  },
  created => Logger.info('PushNotification.createChannel returned:', created),
);

const reactReduxFirebaseConfig: Partial<ReactReduxFirebaseConfig> = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  logErrors: true,
};

const reactReduxFirebaseProviderProps: ReactReduxFirebaseProviderProps = {
  firebase: firebaseApp,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

initializeAppDevSettings();
initTranslation();

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...reactReduxFirebaseProviderProps}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <Authentication>
              <Navigation colorScheme="light" />
            </Authentication>
          </PaperProvider>
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
    // </SafeAreaView>
  );
};

export default App;
