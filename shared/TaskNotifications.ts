import PushNotifications from 'react-native-push-notification';
import {
  addNotification,
  cancelNotification,
  clearNotifications,
} from '../redux/NotificationsReducer';
import {store} from '../redux/MainStore';
import {convertCyclicIntervalToSeconds} from '../helpers/intervalHelpers';
import {Task} from '../types';

class TaskNotifications {
  private static dispatch = store.dispatch;
  private static store = store;

  static cancelAllNotifications() {
    PushNotifications.cancelAllLocalNotifications();
    this.dispatch(clearNotifications());
  }

  static createNotification(task: Task) {
    const notificationCreationTimestamp = Date.now();

    PushNotifications.localNotificationSchedule({
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
    });

    const notificationToStore = {
      taskId: task.id,
      notificationId: notificationCreationTimestamp,
    };
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
      this.dispatch(cancelNotification({taskId: storedNotification?.taskId}));
    }
  }
}
export default TaskNotifications;
