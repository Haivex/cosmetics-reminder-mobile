import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/Colors';
import CompletedTasksScreen from '../../screens/CompletedTasksScreen';
import CurrentTasksScreen from '../../screens/CurrentTasksScreen';
import TaskCreationScreen from '../../screens/TaskCreationScreen';
import {translate} from '../../translation/config';
import AppBar from './AppBar';
import {BottomTabParamList} from './types';

/* eslint-disable react-native/no-inline-styles */

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TabTwo"
      screenOptions={{
        header: props => <AppBar {...props} />,
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: Colors.light.disabled,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TaskCreationScreen}
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
        component={CurrentTasksScreen}
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
        component={CompletedTasksScreen}
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
