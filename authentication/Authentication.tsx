import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { ChildrenProp } from '../types';
import AuthButtons from './AuthButtons';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/LoginReducer';
import { RootState } from '../redux/MainStore';
import firebase from 'firebase';
import { UserInfo } from '../redux/LoginReducer';
import { Alert } from 'react-native';

export default function Authentication({ children }: ChildrenProp) {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state: RootState) => state.login)

  const checkIfLogged = async () => {
    if (!process.env.EXPO_AUTH_STATE_KEY) {
      throw new Error('No EXPO_AUTH_STATE_KEY env');
    }

    const secretAuthKey = await SecureStore.getItemAsync(
      process.env.EXPO_AUTH_STATE_KEY
    );
    if (secretAuthKey) {
      const userInfo: UserInfo = JSON.parse(secretAuthKey);
      dispatch(logIn(userInfo))
    }
  };

  React.useEffect(() => {
    checkIfLogged();
  }, [])
  
  return <>{loginInfo.isLogged ? children : <AuthButtons />}</>;
}
