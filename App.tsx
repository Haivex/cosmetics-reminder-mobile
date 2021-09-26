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
//import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import Authentication from './authentication/Authentication';
import Navigation from './navigation/index';
import {store} from './redux/MainStore';
import initTranslation from './translation/config';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
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
      <PaperProvider theme={theme}>
        <Authentication>
          <Navigation colorScheme="light" />
        </Authentication>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      </PaperProvider>
    </Provider>
    // </SafeAreaView>
  );
};

export default App;
