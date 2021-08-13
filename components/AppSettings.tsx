import * as React from 'react';
import { Menu, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import i18n from 'i18n-js';
import { logOut } from '../redux/LoginReducer';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const AppSettings = () => {
  const dispatch = useDispatch();
  const [visibleMenu, setVisibleMenu] = React.useState(false);

  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  return (
    <>
      <Menu
        anchor={<IconButton icon='dots-vertical' onPress={openMenu} />}
        onDismiss={closeMenu}
        visible={visibleMenu}
      >
        <Menu.Item
          onPress={() => {
            firebase.auth().signOut();
            dispatch(logOut());
          }}
          title={i18n.t('appSettings.logOut')}
        />
      </Menu>
    </>
  );
};
export default AppSettings;
