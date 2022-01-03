import PushNotifications, {
  PushNotificationScheduleObject,
} from 'react-native-push-notification';
import {convertCyclicIntervalToSeconds} from '../helpers/intervalHelpers';
import {store} from '../redux/MainStore';
import {
  addNotification,
  cancelNotification,
  clearNotifications,
} from '../redux/NotificationsReducer';
import Logger from '../shared/Logger';
import {Task} from '../types';

class TaskNotifications {
  private static dispatch = store.dispatch;
  private static store = store;

  static cancelAllNotifications() {
    PushNotifications.cancelAllLocalNotifications();
    Logger.warn('Cancelled all notifications');
    this.dispatch(clearNotifications());
  }

  static createNotification(task: Task) {
    const notificationCreationTimestamp = Date.now();

    const notification: PushNotificationScheduleObject = {
      channelId: 'main',
      id: notificationCreationTimestamp,
      title: 'Only You',
      message: task.title,
      date: new Date(task.date.toDate()),
      allowWhileIdle: true,
      repeatType: task.cyclicInterval ? 'time' : undefined,
      repeatTime: task.cyclicInterval
        ? convertCyclicIntervalToSeconds(task.cyclicInterval) * 1000
        : 1,
    };

    PushNotifications.localNotificationSchedule(notification);

    const notificationToStore = {
      taskId: task.id,
      notificationId: notification.id as number,
    };
    Logger.info('Created notification for given task', notification);
    this.dispatch(addNotification(notificationToStore));
  }

  static cancelNotification(task: Task) {
    const storedNotification = this.store
      .getState()
      .notifications.storedNotifications.find(
        notification =>
          notification.taskId === task.originTaskId ||
          notification.taskId === task.id,
      );

    if (storedNotification) {
      PushNotifications.cancelLocalNotification(
        storedNotification.notificationId.toString(),
      );
      Logger.info(
        'Cancelled notification for task with id',
        storedNotification.taskId,
      );
      this.dispatch(cancelNotification({taskId: storedNotification?.taskId}));
    }
  }
}
export default TaskNotifications;
