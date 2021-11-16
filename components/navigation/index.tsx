/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import RenameDialog from '../dialogs/RenameDialog';
import NotFoundScreen from '../../screens/NotFoundScreen';
import NotificationsSettingsScreen from '../../screens/NotificationsSettings';
import TaskEditionScreen from '../../screens/TaskEditionScreen';
import {translate} from '../../translation/config';
import {RootStackParamList} from './types';
import BottomTabNavigator from './BottomTabNavigator';
import RNBootSplash from 'react-native-bootsplash';
//import LinkingConfiguration from './LinkingConfiguration';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      onReady={() => RNBootSplash.hide()}
      ref={navigationRef}
      //linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{title: 'Oops!'}}
        />
        <Stack.Screen
          name="NotificationsSettings"
          component={NotificationsSettingsScreen}
          options={{
            title: translate('appSettings.notificationsSettings'),
            headerShown: true,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="TaskEdition"
          component={TaskEditionScreen}
          options={{
            title: translate('editTaskScreen.title'),
            headerShown: true,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
        <Stack.Screen name="RenameTaskDialog" component={RenameDialog} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
