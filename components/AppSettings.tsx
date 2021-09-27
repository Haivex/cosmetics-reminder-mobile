import auth from '@react-native-firebase/auth';
import i18n from 'i18n-js';
import * as React from 'react';
import {IconButton, Menu} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logOut} from '../redux/UserReducer';

const AppSettings = () => {
  const dispatch = useDispatch();
  const [visibleMenu, setVisibleMenu] = React.useState(false);

  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  return (
    <>
      <Menu
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
        onDismiss={closeMenu}
        visible={visibleMenu}>
        <Menu.Item
          onPress={() => {
            auth()
              .signOut()
              .then(() => dispatch(logOut()));
          }}
          title={i18n.t('appSettings.logOut')}
        />
      </Menu>
    </>
  );
};
export default AppSettings;
