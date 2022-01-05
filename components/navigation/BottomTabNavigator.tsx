import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppSettings from '../AppSettings';
import Colors from '../../constants/Colors';
import CompletedTasksScreen from '../../screens/CompletedTasksScreen';
import CurrentTasksScreen from '../../screens/CurrentTasksScreen';
import TaskCreationScreen from '../../screens/TaskCreationScreen';
import {translate} from '../../translation/config';
import {
  BottomTabParamList,
  TabOneParamList,
  TabThreeParamList,
  TabTwoParamList,
} from './types';

/* eslint-disable react-native/no-inline-styles */

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TabTwo"
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
        header: () => null,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              size={30}
              style={{marginBottom: -3}}
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
              style={{marginBottom: -3}}
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
              style={{marginBottom: -3}}
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
          headerRight: () => <AppSettings />,
          headerTitle: translate('createTaskScreen.screenTitle'),
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
          headerRight: () => <AppSettings />,
          headerTitle: translate('currentTasksScreen.screenTitle'),
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
          headerRight: () => <AppSettings />,
          headerTitle: translate('finishedTasksScreen.screenTitle'),
        }}
      />
    </TabThreeStack.Navigator>
  );
}
