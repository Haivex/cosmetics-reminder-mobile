import {deleteTask} from '../../../firebase/deleteTask';
import {updateTaskCompletion} from '../../../firebase/updateTaskCompletion';
import TaskNotifications from '../../../shared/TaskNotifications';
import initTranslation, {translate} from '../../../translation/config';
import {SingleAction} from '../TaskMenu';
import {navigationRef} from '../../navigation/index';
import {convertCyclicIntervalToSeconds} from '../../../helpers/intervalHelpers';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
initTranslation();

export const renameAction: SingleAction = {
  title: translate('taskMenu.changeTitle'),
  callback: task => {
    navigationRef.current?.navigate('RenameTaskDialog', task);
  },
};

export const completeAction: SingleAction = {
  title: translate('taskMenu.finishTask'),
  callback: task => {
    updateTaskCompletion(task.id, true)
      .then(() => TaskNotifications.cancelNotification(task))
      .then(() => {
        if (task.cyclicInterval) {
          const nextDate = new Date(
            task.date.toMillis() +
              convertCyclicIntervalToSeconds(task.cyclicInterval) * 1000,
          );
          const nextTimestampDate =
            FirebaseFirestoreTypes.Timestamp.fromDate(nextDate);
          const nextTask = Object.assign({}, task);
          nextTask.date = nextTimestampDate;
          TaskNotifications.createNotification(nextTask);
        }
      })
      .catch(error => {
        console.error('Complete task error: ', error);
      });
  },
};

export const deleteAction: SingleAction = {
  title: translate('taskMenu.deleteTask'),
  callback: task => {
    deleteTask(task.id)
      .then(() => {
        TaskNotifications.cancelNotification(task);
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
  callback: task => {
    navigationRef.current?.navigate('TaskEdition', task);
  },
};
