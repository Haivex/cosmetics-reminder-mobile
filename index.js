/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import {LogBox} from 'react-native';

/* eslint-disable quotes */

LogBox.ignoreLogs([
  `EventEmitter.removeListener('change', ...): Method has been deprecated.`,
]);

AppRegistry.registerComponent(appName, () => App);
