import {AppRegistry, LogBox} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  "EventEmitter.removeListener('change', ...): Method has been deprecated.",
  'NativeFirebaseError: [firestore/unknown] Cannot call useEmulator() after instance has already been initialized.',
]);
AppRegistry.registerComponent(appName, () => App);
