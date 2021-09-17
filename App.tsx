import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { darkTheme, lightTheme } from './constants/Theme';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { store } from './redux/MainStore';
import initTranslation from './translation/config';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import config from './firebase/config';

initTranslation();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(config.firebaseWebConfig);
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
              <PaperProvider
                theme={colorScheme === 'light' ? lightTheme : darkTheme}
              >
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
