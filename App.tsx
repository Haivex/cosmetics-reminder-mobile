import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { darkTheme, lightTheme } from './constants/Theme';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import TodosContext, { globalState } from './store/MainStore';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
        <TodosContext.Provider value={globalState}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </TodosContext.Provider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
