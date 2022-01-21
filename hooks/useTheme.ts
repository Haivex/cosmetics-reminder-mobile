import {darkTheme, ExtendedTheme, lightTheme} from '../constants/Theme';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectTheme} from '../redux/selectors';

const useTheme = (): ExtendedTheme => {
  const state = useTrackedSelector();
  const theme = selectTheme(state);
  return theme === 'dark' ? darkTheme : lightTheme;
};

export default useTheme;
