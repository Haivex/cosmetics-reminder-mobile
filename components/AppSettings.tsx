import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {Appbar, Menu, useTheme} from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import {useDispatch} from 'react-redux';
import {auth} from '../App';
import {logOut} from '../redux/UserReducer';
import TaskNotifications from '../shared/TaskNotifications';
import {translate} from '../translation/config';
import ErrorDialog from './dialogs/ErrorDialog';
import {NavigationProp} from './navigation/types';

const AppSettings = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [error, setError] = React.useState('');
  const theme = useTheme();

  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  return (
    <>
      <Menu
        anchor={
          <Appbar.Action
            color={theme.colors.text}
            icon="cog"
            onPress={openMenu}
          />
        }
        onDismiss={closeMenu}
        visible={visibleMenu}>
        <Menu.Item
          onPress={() => {
            auth
              .signOut()
              .then(() => {
                TaskNotifications.cancelAllNotifications();
                dispatch(logOut());
              })
              .catch(catchedError => {
                console.error(catchedError);
                setError(catchedError);
              });
          }}
          title={
            <TextTicker style={{color: theme.colors.text}} loop marqueeDelay={1000}>
              {translate('appSettings.logOut')}
            </TextTicker>
          }
          icon="logout"     
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate('NotificationsSettings');
            closeMenu();
          }}
          title={
            <TextTicker style={{color: theme.colors.text}} loop>
              {translate('appSettings.notificationsSettings')}
            </TextTicker>
          }
          icon="bell"
        />
      </Menu>
      {Boolean(error) && (
        <ErrorDialog
          error={error}
          title="Sign-out Error"
          description="Sign-out Error! Try again later"
        />
      )}
    </>
  );
};
export default AppSettings;
