import {
  StackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack/lib/typescript/src/types';
import {Task} from '../../types';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  NotificationsSettings: undefined;
  TaskEdition: Task;
  RenameTaskDialog: Task;
  TabTwo: undefined;
  AppDevSettings: undefined;
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

export type NavigationProps = StackScreenProps<
  RootStackParamList,
  'TaskEdition'
>;

export type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'TaskEdition' | 'TabTwo'
>;
