import * as React from 'react';
import {Task} from './redux/TodosReducer';
import {StackScreenProps} from '@react-navigation/stack';
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
