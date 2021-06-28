import AsyncStorage from '@react-native-async-storage/async-storage';

type NotificationIdentifierWithTaskId = {
  taskId: string;
  notificationIdentifier: string;
}

export const storeNotifications = async (notifications: NotificationIdentifierWithTaskId[]) => {
    try {
      const jsonValue = JSON.stringify(notifications)
      await AsyncStorage.setItem('notifiations', jsonValue)
    } catch (e) {
      // saving error
    }
}

export const getNotifications = async (): Promise<NotificationIdentifierWithTaskId[] | null>  => {
  try {
    const jsonValue = await AsyncStorage.getItem('notifications')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
    return null;
  }
}

export const getNotificationByTaskId = async (taskId: string) => {
  try {
    const notifications = await getNotifications()
    if(notifications) {
      const foundedNotification = notifications.find((notification) => notification.taskId == taskId);
      return foundedNotification;
    }
  } catch (e) {
    // saving error
  }
}


export const removeNotificationByTaskId = async (taskId: string) => {
  try {
    const notifications = await getNotifications()
    if(notifications) {
      const updatedNotifications = notifications.filter((notification) => notification.taskId !== taskId);
      storeNotifications(updatedNotifications);
    }
  } catch (e) {
    // saving error
  }
}


