import React from 'react';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';

type ErrorDialogProps = {
  error: Error | string;
  title: string;
  description: string;
};
const ErrorDialog = ({error, title, description}: ErrorDialogProps) => {
  const [visibleDialog, setVisibleDialog] = React.useState(true);
  const hideDialog = () => setVisibleDialog(false);

  return (
    <Portal>
      <Dialog visible={visibleDialog} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{description}</Paragraph>
          <Paragraph>{error}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default ErrorDialog;
