import {auth, firebaseApp} from '../App';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {GoogleSocialButton} from 'react-native-social-buttons';
import ErrorDialog from '../components/ErrorDialog';
import {AuthButtonProps} from './Authentication';

GoogleSignin.configure({
  webClientId:
    '231511460067-mdt6l95v5id047d7dhngmo8lprmelpah.apps.googleusercontent.com',
});

function GoogleSignInButton({disabled, setLoading}: AuthButtonProps) {
  const [error, setError] = React.useState('');

  useEffect(() => {
    GoogleSignin.isSignedIn().then(isLoggedIn =>
      isLoggedIn ? GoogleSignin.signOut() : null,
    );
  }, []);

  async function onGoogleButtonPress() {
    setLoading(true);
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential =
      firebaseApp.auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth.signInWithCredential(googleCredential);
  }

  return (
    <>
      <GoogleSocialButton
        disabled={disabled}
        onPress={() =>
          onGoogleButtonPress()
            .then(() => console.info('Signed in with Google!'))
            .catch(catchedError => {
              console.error('Google Sign-in Error:', catchedError);
              setError(catchedError);
            })
            .finally(() => {
              setLoading(false);
            })
        }
      />
      {Boolean(error) && (
        <ErrorDialog
          title="Google Sign-in Error!"
          description="Google Sign-in Error! Try again later."
          error={error}
        />
      )}
    </>
  );
}

export default GoogleSignInButton;
