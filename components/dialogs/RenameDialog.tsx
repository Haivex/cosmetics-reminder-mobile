import React from 'react';
import {Button, Dialog, Paragraph, Portal, TextInput} from 'react-native-paper';
import {renameTask} from '../../firebase/renameTask';
import {translate} from '../../translation/config';
import {NavigationProps} from '../navigation/types';
import ErrorDialog from './ErrorDialog';

const RenameDialog = ({route}: NavigationProps) => {
  const task = route.params;
  const [visibleDialog, setVisibleDialog] = React.useState(true);
  const [newTitle, setTitle] = React.useState(task.title);
  const [error, setError] = React.useState('');
  const hideDialog = () => setVisibleDialog(false);

  return (
    <>
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>{translate('taskMenu.renameInput.title')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {translate('taskMenu.renameInput.description')}
            </Paragraph>
            <TextInput
              defaultValue={task.title}
              value={newTitle}
              onChangeText={value => setTitle(value)}
              autoFocus
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              {translate('taskMenu.renameInput.cancelButton')}
            </Button>
            <Button
              onPress={() => {
                renameTask(task.id, newTitle).catch(catchedError => {
                  console.error('Rename Task Error:', catchedError);
                  setError(catchedError);
                });
                hideDialog();
              }}>
              {translate('taskMenu.renameInput.changeButton')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {Boolean(error) && (
        <ErrorDialog
          title="Rename Error"
          description="Cannot rename task! Try again later"
          error={error}
        />
      )}
    </>
  );
};
export default RenameDialog;
