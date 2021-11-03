import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {GoogleSocialButton} from 'react-native-social-buttons';
import ErrorDialog from '../components/ErrorDialog';

GoogleSignin.configure({
  webClientId:
    '231511460067-mdt6l95v5id047d7dhngmo8lprmelpah.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function GoogleSignInButton() {
  const [error, setError] = React.useState('');

  useEffect(() => {
    GoogleSignin.isSignedIn().then(isLoggedIn =>
      isLoggedIn ? GoogleSignin.signOut() : null,
    );
  }, []);
  return (
    <>
      <GoogleSocialButton
        onPress={() =>
          onGoogleButtonPress()
            .then(() => console.info('Signed in with Google!'))
            .catch(catchedError => {
              console.error('Google Sign-in Error:', catchedError);
              setError(catchedError);
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
