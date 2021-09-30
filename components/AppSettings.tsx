import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/core';
import i18n from 'i18n-js';
import * as React from 'react';
import {IconButton, Menu} from 'react-native-paper';
import PushNotification from 'react-native-push-notification';
import {useDispatch} from 'react-redux';
import Navigation from '../navigation';
import {logOut} from '../redux/UserReducer';

const AppSettings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visibleMenu, setVisibleMenu] = React.useState(false);

  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  return (
    <>
      <Menu
        anchor={<IconButton icon="cog-outline" onPress={openMenu} />}
        onDismiss={closeMenu}
        visible={visibleMenu}>
        <Menu.Item
          onPress={() => {
            closeMenu();
            auth()
              .signOut()
              .then(() => dispatch(logOut()));
          }}
          title={i18n.t('appSettings.logOut')}
          icon="logout"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('NotificationsSettings');
          }}
          title={i18n.t('appSettings.notificationsSettings')}
          icon="bell"
        />
      </Menu>
    </>
  );
};
export default AppSettings;
