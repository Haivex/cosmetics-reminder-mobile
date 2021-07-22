import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { Button } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import { AuthInfo, logIn } from '../redux/LoginReducer';
import { useDispatch } from 'react-redux';

 const GoogleAuthentication = () => {
    const [user, setUser] = React.useState<GoogleSignIn.GoogleUser | null>(null);
    const dispatch = useDispatch();

    const _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        setUser(user);

        if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
            throw new Error('No EXPO_AUTH_STATE_KEY env');
          }

          const loginInfo: AuthInfo = {
            authProvider: 'GOOGLE',
            authData: {
                user,
            }
        }
  
          const storageValue = JSON.stringify(loginInfo)
  
          SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, storageValue);
          dispatch(logIn(loginInfo));
      };

    const initAsync = async () => {
        await GoogleSignIn.initAsync({
          clientId: process.env.GOOGLE_IOS_CLIENT_ID,
        });
        _syncUserWithStateAsync();
      };

    React.useEffect(() => {
        initAsync();
    }, [])
 
  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setUser(null);

    if (process.env.EXPO_AUTH_STATE_KEY === undefined) {
        throw new Error('No EXPO_AUTH_STATE_KEY env');
    }

      SecureStore.setItemAsync(process.env.EXPO_AUTH_STATE_KEY, "");
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        _syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

    return (<Button title="Login with Google" onPress={signInAsync} />)
}

export default GoogleAuthentication;
