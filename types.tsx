import * as React from 'react';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
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
  TabTwo: undefined;
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

export type NavigationProp = StackNavigationProp<RootStackParamList, "TaskEdition" | 'TabTwo'>

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

// https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript

export type GetDictValue<
  T extends string,
  O,
> = T extends `${infer A}.${infer B}`
  ? A extends keyof O
    ? GetDictValue<B, O[A]>
    : never
  : T extends keyof O
  ? O[T]
  : never;

type Concat<K extends string, P extends string> = `${K}${'' extends P
  ? ''
  : '.'}${P}`;

export type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]-?: `${K & string}` | Concat<K & string, DeepKeys<T[K]>>;
    }[keyof T]
  : '';

export type DeepKeysLighweight<T, S extends string> = T extends object
  ? S extends `${infer I1}.${infer I2}`
    ? I1 extends keyof T
      ? `${I1}.${DeepKeysLighweight<T[I1], I2>}`
      : keyof T & string
    : S extends keyof T
    ? `${S}`
    : keyof T & string
  : '';

export type DeepLeafKeys<T> = T extends object
  ? {[K in keyof T]-?: Concat<K & string, DeepKeys<T[K]>>}[keyof T]
  : '';
