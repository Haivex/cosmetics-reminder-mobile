import Notifications from 'react-native-push-notification';
import {deleteTask} from '../../firebase/deleteTask';
import {updateTaskCompletion} from '../../firebase/updateTaskCompletion';
import initTranslation, {translate} from '../../translation/config';
import {SingleAction} from '../TaskMenu';

initTranslation();

export const renameAction: SingleAction = {
  title: translate('taskMenu.changeTitle'),
  callback: task => {
    //TODO: navigate to rename task screen
    console.log('Rename task' + task);
  },
};

export const completeAction: SingleAction = {
  title: translate('taskMenu.finishTask'),
  callback: task => {
    updateTaskCompletion(task.id, true);
  },
};

export const deleteAction: SingleAction = {
  title: translate('taskMenu.deleteTask'),
  callback: (task, appState) => {
    deleteTask(task.id).then(() => {
      const storedNotification =
        appState?.globalState.notifications.storedNotifications.find(
          notification => notification.taskId === task.id,
        );
      Notifications.cancelLocalNotification(
        storedNotification?.notificationId.toString() || '',
      );
    });
  },
};

export const restoreAction: SingleAction = {
  title: translate('taskMenu.restoreTask'),
  callback: task => {
    updateTaskCompletion(task.id, false);
  },
};

export const editAction: SingleAction = {
  title: translate('taskMenu.editTask'),
  callback: (task, appState) => {
    console.log('Task edition' + task);
    appState?.navigation.current?.navigate('TaskEdition', task);
  },
};
