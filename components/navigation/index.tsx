import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {darkTheme, lightTheme} from '../../constants/Theme';
import AppDevSettingsScreen from '../../screens/AppDevSettingsScreen';
import NotFoundScreen from '../../screens/NotFoundScreen';
import NotificationsSettingsScreen from '../../screens/NotificationsSettings';
import TaskEditionScreen from '../../screens/TaskEditionScreen';
import {translate} from '../../translation/config';
import RenameDialog from '../dialogs/RenameDialog';
import AppBar from './AppBar';
import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from './types';

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
      theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name="Root"
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name="AppDevSettings"
          component={AppDevSettingsScreen}
          options={{
            header: props => <AppBar {...props} />,
            title: 'App Dev Settings',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{title: 'Oops!'}}
        />
        <Stack.Screen
          name="NotificationsSettings"
          component={NotificationsSettingsScreen}
          options={{
            header: props => <AppBar {...props} />,
            title: translate('appSettings.notificationsSettings'),
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="TaskEdition"
          component={TaskEditionScreen}
          options={{
            header: props => <AppBar {...props} />,
            title: translate('editTaskScreen.title'),
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
