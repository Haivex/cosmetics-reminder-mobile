import React from 'react';
import auth from '@react-native-firebase/auth';
import {AccessToken, LoginButton} from 'react-native-fbsdk-next';
import ErrorDialog from '../components/ErrorDialog';

function FacebookSignInButton() {
  const [error, setError] = React.useState('');

  return (
    <>
      <LoginButton
        onLoginFinished={(catchedError, result) => {
          if (catchedError) {
            setError(catchedError);
            return;
          }
          if (result.isCancelled) {
            setError('Login is cancelled');
            return;
          }
          AccessToken.getCurrentAccessToken()
            .then(data => {
              if (data) {
                const accessToken = data.accessToken.toString();
                const credential =
                  auth.FacebookAuthProvider.credential(accessToken);

                return credential;
              }
              throw new Error('Cannot get access token');
            })
            .then(credential => {
              return auth().signInWithCredential(credential);
            })
            .catch(catchedOtherError => {
              setError(catchedOtherError);
            });
        }}
      />
      {Boolean(error) && (
        <ErrorDialog
          title="Facebook Sign-in Error!"
          description="Facebook Sign-in Error! Try again later."
          error={error}
        />
      )}
    </>
  );
}

export default FacebookSignInButton;
