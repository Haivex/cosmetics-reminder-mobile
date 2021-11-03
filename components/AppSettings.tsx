import * as React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';
import {translate} from '../translation/config';
import {IconButton, Menu} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logOut} from '../redux/UserReducer';
import {NavigationProp} from '../types';
import ErrorDialog from './ErrorDialog';

const AppSettings = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [error, setError] = React.useState('');

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
            auth()
              .signOut()
              .then(() => {
                dispatch(logOut());
                closeMenu();
              })
              .catch(catchedError => {
                console.error(catchedError);
                setError(catchedError);
              });
          }}
          title={translate('appSettings.logOut')}
          icon="logout"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('NotificationsSettings');
          }}
          title={translate('appSettings.notificationsSettings')}
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
