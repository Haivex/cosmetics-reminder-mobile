import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';
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
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
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
              showDialog();
            })
        }
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Google Sign-in Error! Try again later.</Paragraph>
            <Paragraph>{error}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

export default GoogleSignInButton;
