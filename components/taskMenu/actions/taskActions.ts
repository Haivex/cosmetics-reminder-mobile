import Notifications from 'react-native-push-notification';
import {deleteTask} from '../../../firebase/deleteTask';
import {updateTaskCompletion} from '../../../firebase/updateTaskCompletion';
import initTranslation, {translate} from '../../../translation/config';
import {SingleAction} from '../TaskMenu';

initTranslation();

export const renameAction: SingleAction = {
  title: translate('taskMenu.changeTitle'),
  callback: (task, appState) => {
    appState?.navigation.current?.navigate('RenameTaskDialog', task);
  },
};

export const completeAction: SingleAction = {
  title: translate('taskMenu.finishTask'),
  callback: task => {
    updateTaskCompletion(task.id, true).catch(error => {
      console.error('Complete task error: ', error);
    });
  },
};

export const deleteAction: SingleAction = {
  title: translate('taskMenu.deleteTask'),
  callback: (task, appState) => {
    deleteTask(task.id)
      .then(() => {
        const storedNotification =
          appState?.globalState.notifications.storedNotifications.find(
            notification => notification.taskId === task.id,
          );
        Notifications.cancelLocalNotification(
          storedNotification?.notificationId.toString() || '',
        );
      })
      .catch(error => {
        console.error('Delete task error: ', error);
      });
  },
};

export const restoreAction: SingleAction = {
  title: translate('taskMenu.restoreTask'),
  callback: task => {
    updateTaskCompletion(task.id, false).catch(error => {
      console.error('Update task error: ', error);
    });
  },
};

export const editAction: SingleAction = {
  title: translate('taskMenu.editTask'),
  callback: (task, appState) => {
    appState?.navigation.current?.navigate('TaskEdition', task);
  },
};
