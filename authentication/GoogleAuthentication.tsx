import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {GoogleSocialButton} from 'react-native-social-buttons';

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
  useEffect(() => {
    GoogleSignin.isSignedIn().then(isLoggedIn =>
      isLoggedIn ? GoogleSignin.signOut() : null,
    );
  }, []);
  return (
    <GoogleSocialButton
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  );
}

export default GoogleSignInButton;
