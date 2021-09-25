import i18n from 'i18n-js';
import * as React from 'react';
import {IconButton, Menu} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logOut} from '../redux/LoginReducer';

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
            dispatch(logOut());
          }}
          title={i18n.t('appSettings.logOut')}
        />
      </Menu>
    </>
  );
};
export default AppSettings;
