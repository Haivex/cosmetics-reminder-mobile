import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {convertCyclicIntervalToSeconds} from '../helpers/intervalHelpers';
// import {
//   getNotifications,
//   storeNotifications,
// } from '../notificationsStorage/asyncStorage';
import {ChildrenProp} from '../types';
import {CyclicInterval} from './CyclicTaskInputs';

type ScheduledNotificationOptions = {
  title: string;
  body: string;
  data?: any;
  scheduledDate: Date;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: AndroidNotificationPriority.MAX,
  }),
});

export default function NotificationWrapper({children}: ChildrenProp) {
  return <>{children}</>;
}

// async function setCyclicNotifications(
//   givenNotification: Notifications.Notification
// ) {
//   const { title, body } = givenNotification.request.content;
//   const createdTask = givenNotification.request.content.data
//     .data as unknown as SavedTask;
//   const interval = convertCyclicIntervalToSeconds(
//     createdTask.cyclicInterval as CyclicInterval
//   );

//   const notificationIdentifier = await Notifications.scheduleNotificationAsync({
//     content: {
//       title: title as string,
//       body: body as string,
//     },
//     trigger: {
//       seconds: interval,
//       repeats: true,
//     },
//   });

//   const notifications = await getNotifications();
//   if (notifications) {
//     const newNotifications = [
//       ...notifications,
//       { notificationIdentifier: notificationIdentifier, taskId: createdTask.id },
//     ];
//     storeNotifications(newNotifications);
//   } else {
//     storeNotifications([
//       { notificationIdentifier: notificationIdentifier, taskId: createdTask.id },
//     ]);
//   }
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const {status: existingStatus} = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const {status} = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }
//
//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }
//
//   return token;
// }

// export async function schedulePushNotification({
//   title,
//   body,
//   data,
//   scheduledDate,
// }: ScheduledNotificationOptions) {
//   const interval = convertCyclicIntervalToSeconds(
//     data.cyclicInterval as CyclicInterval,
//   );
//   return await Notifications.scheduleNotificationAsync({
//     content: {
//       title,
//       body,
//       data: {data: data},
//     },
//     trigger: {
//       ...scheduledDate,
//       repeats: data.cyclicInterval ? true : false,
//       seconds: data.cyclicInterval ? interval : undefined,
//     },
//   });
// }
