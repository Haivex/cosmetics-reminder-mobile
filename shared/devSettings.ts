import {DevSettings} from 'react-native';
import {navigationRef} from '../components/navigation/index';

const initializeAppDevSettings = () => {
  DevSettings.addMenuItem('App Dev Settings', () => {
    navigationRef.current?.navigate('AppDevSettings');
  });
};
export default initializeAppDevSettings;
