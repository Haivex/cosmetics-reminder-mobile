import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { ChildrenProp } from '../components/NotificationWrapper';
import AuthButtons from './AuthButtons';

//Google development Authentication
export default function Authentication({ children }: ChildrenProp) {
  const [isLogged, setLogged] = React.useState(false);

  const checkIfLogged = async () => {
    if (!process.env.EXPO_AUTH_STATE_KEY) {
      throw new Error('No EXPO_AUTH_STATE_KEY env');
    }

    const secretAuthKey = await SecureStore.getItemAsync(
      process.env.EXPO_AUTH_STATE_KEY
    );
    if (secretAuthKey) {
      setLogged(true);
    }
  };

  React.useEffect(() => {
    checkIfLogged();
  }, [])
  
  return <>{isLogged ? children : <AuthButtons />}</>;
}
