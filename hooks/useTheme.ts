import {lightTheme, darkTheme, ExtendedTheme} from '../constants/Theme';
import {Appearance} from 'react-native';
const useTheme = (): ExtendedTheme => {
  return Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
};

export default useTheme;
