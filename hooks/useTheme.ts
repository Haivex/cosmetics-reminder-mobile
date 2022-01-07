import {lightTheme, darkTheme} from '../constants/Theme';
import {Appearance} from 'react-native';
const useTheme = () => {
  return Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
};

export default useTheme;
