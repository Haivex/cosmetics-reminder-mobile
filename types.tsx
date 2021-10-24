import * as React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {CyclicInterval} from './components/CyclicTaskInputs';
/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  NotificationsSettings: undefined;
  TaskEdition: Task;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type TabThreeParamList = {
  TabThreeScreen: undefined;
};

export type ChildrenProp = {
  children: React.ReactChild | React.ReactChild[];
};

export type NavigationProps = StackScreenProps<
  RootStackParamList,
  'TaskEdition'
>;

export type Task = {
  id: string;
  title: string;
  date: FirebaseFirestoreTypes.Timestamp;
  completed: boolean;
  cyclicInterval?: CyclicInterval | undefined;
};

export type RenameTaskPayload = {
  task: Task;
  title: string;
};
