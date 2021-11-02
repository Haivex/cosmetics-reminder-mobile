import React from 'react';
import auth from '@react-native-firebase/auth';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';
import {AccessToken, LoginButton} from 'react-native-fbsdk-next';

function FacebookSignInButton() {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [error, setError] = React.useState('');

  return (
    <>
      <LoginButton
        onLoginFinished={(catchedError, result) => {
          if (catchedError) {
            setError(catchedError);
            showDialog();
            return;
          }
          if (result.isCancelled) {
            setError('Login is cancelled');
            showDialog();
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
              showDialog();
            });
        }}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Facebook Sign-in Error! Try again later.</Paragraph>
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

export default FacebookSignInButton;
