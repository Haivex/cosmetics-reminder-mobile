import * as Notifications from 'expo-notifications';
import {
  AndroidNotificationPriority,
  Notification,
} from 'expo-notifications/build/Notifications.types';
import React, { useEffect, useRef, useState } from 'react';
import { Button, View, Text, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Subscription } from '@unimodules/core';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: AndroidNotificationPriority.MAX,
  }),
});

type ChildrenProp = {
  children: React.ReactChild | React.ReactChild[];
};

export default function NotificationWrapper({ children }: ChildrenProp) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notification | null>(null);
  const notificationListener = useRef<Subscription>(null!);
  const responseListener = useRef<Subscription>(null!)!;

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token as string)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <>{children}</>;
}

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

type ScheduledNotificationOptions = {
  title: string;
  body: string;
  data?: any;
  scheduledDate: Date;
}

export async function schedulePushNotification({title, body, data, scheduledDate}: ScheduledNotificationOptions) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { data: data },
    },
    trigger: {date: scheduledDate, seconds: scheduledDate.getTime() - new Date().getTime()},
  });
}