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
import NotificationWrapper from './components/NotificationWrapper';
import initTranslation from './translation/config';
import Authentication from './authentication/Auhentication';

initTranslation()

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Authentication>
        <NotificationWrapper>
          <PaperProvider
            theme={colorScheme === 'light' ? lightTheme : darkTheme}
          >
            <Provider store={store}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </Provider>
          </PaperProvider>
        </NotificationWrapper>
        </Authentication>
      </SafeAreaProvider>
    );
  }
}
