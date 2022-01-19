import {darkTheme, ExtendedTheme, lightTheme} from '../constants/Theme';
import {store} from '../redux/MainStore';
import {selectTheme} from '../redux/selectors';

const useTheme = (): ExtendedTheme => {
  const state = store.getState();
  const theme = selectTheme(state);
  return theme === 'dark' ? darkTheme : lightTheme;
};

export default useTheme;
