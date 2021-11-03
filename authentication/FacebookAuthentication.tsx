import auth from '@react-native-firebase/auth';
import React from 'react';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {FacebookSocialButton} from 'react-native-social-buttons';
import ErrorDialog from '../components/ErrorDialog';

function FacebookSignInButton() {
  const [error, setError] = React.useState('');

  const onButtonPress = async () => {
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

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth().signInWithCredential(facebookCredential);
  };

  return (
    <>
      <FacebookSocialButton
        onPress={() => {
          onButtonPress()
            .then(() => console.log('Signed in with Facebook!'))
            .catch(catchedError => {
              setError(catchedError);
              console.error(catchedError);
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
