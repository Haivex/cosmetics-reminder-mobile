import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import CompletedTasksScreen from '../../screens/CompletedTasksScreen';
import CurrentTasksScreen from '../../screens/CurrentTasksScreen';
import TaskCreationScreen from '../../screens/TaskCreationScreen';
import {translate} from '../../translation/config';
import AppBar from './AppBar';
import {
  BottomTabParamList,
  TabOneParamList,
  TabThreeParamList,
  TabTwoParamList,
} from './types';

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const theme = useTheme();
  return (
    <BottomTab.Navigator initialRouteName="TabTwo" labeled theme={theme}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              size={30}
              style={styles.tabBarIcon}
              name="file-plus"
              color={color}
            />
          ),
          title: translate('bottomNavigation.createTaskTitle'),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              size={30}
              style={styles.tabBarIcon}
              name="file-clock"
              color={color}
            />
          ),
          title: translate('bottomNavigation.currentTasks'),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              size={30}
              style={styles.tabBarIcon}
              name="file-check"
              color={color}
            />
          ),
          title: translate('bottomNavigation.finishedTasks'),
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TaskCreationScreen}
        options={{
          header: props => <AppBar {...props} />,
          title: translate('bottomNavigation.createTaskTitle'),
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={CurrentTasksScreen}
        options={{
          header: props => <AppBar {...props} />,
          title: translate('bottomNavigation.currentTasks'),
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={CompletedTasksScreen}
        options={{
          header: props => <AppBar {...props} />,
          title: translate('bottomNavigation.finishedTasks'),
        }}
      />
    </TabThreeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 16,
  },
  tabBar: {},
  tabBarIcon: {
    marginBottom: -3,
  },
});
