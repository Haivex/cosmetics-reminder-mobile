import React from 'react';
import {Switch} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectTheme} from '../redux/selectors';
import {changeTheme} from '../redux/ThemeReducer';

const ThemeStatus = () => {
  const state = useTrackedSelector();
  const themeStatus = selectTheme(state) === 'dark' ? false : true;
  const dispatch = useDispatch();

  const onToggleSwitch = (newValue: boolean) => {
    dispatch(changeTheme(newValue ? 'light' : 'dark'));
  };

  return <Switch value={themeStatus} onValueChange={onToggleSwitch} />;
};
export default ThemeStatus;
