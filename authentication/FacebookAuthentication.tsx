import {auth, firebaseApp} from '../App';
import React from 'react';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {FacebookSocialButton} from 'react-native-social-buttons';
import ErrorDialog from '../components/ErrorDialog';
import {AuthButtonProps} from './Authentication';

function FacebookSignInButton({disabled, setLoading}: AuthButtonProps) {
  const [error, setError] = React.useState('');

  const onButtonPress = async () => {
    setLoading(true);
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw new Error('Login is cancelled');
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }

    const facebookCredential = firebaseApp.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth.signInWithCredential(facebookCredential);
  };

  return (
    <>
      <FacebookSocialButton
        disabled={disabled}
        onPress={() => {
          onButtonPress()
            .then(() => console.log('Signed in with Facebook!'))
            .catch(catchedError => {
              setError(catchedError);
              console.error(catchedError);
            })
            .finally(() => {
              setLoading(false);
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
