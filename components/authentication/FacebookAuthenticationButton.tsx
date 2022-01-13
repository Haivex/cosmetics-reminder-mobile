import {auth, firebaseApp} from '../../App';
import React from 'react';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {FacebookSocialButton} from 'react-native-social-buttons';
import ErrorDialog from '../dialogs/ErrorDialog';
import {AuthButtonProps} from './Authentication';
import Logger from '../../shared/Logger';

function FacebookSignInButton({disabled, setLoading, style}: AuthButtonProps) {
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
        buttonViewStyle={style}
        disabled={disabled}
        onPress={() => {
          onButtonPress()
            .then(() => Logger.info('Signed in with Facebook!'))
            .catch(catchedError => {
              setError(catchedError);
              Logger.warn('Facebook Sign-in Error', catchedError);
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
