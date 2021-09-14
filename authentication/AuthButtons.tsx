import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import AppleAuthentication from './AppleAuthentication';
import FacebookAuthentication from './FacebookAuthentication';
import FacebookDevelopmentAuthentication from './FacebookDevelopmentAuthentication';
import GoogleAuthentication from './GoogleAuthentication';

const AuthButtons = () => {
  return (
    <>
      {process.env.IS_DEV === 'true' ? (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <AppleAuthentication />}
            <FacebookDevelopmentAuthentication />
        </View>
      ) : (
        <View style={styles.container}> 
          {Platform.OS === 'ios' && <AppleAuthentication />}
          <FacebookAuthentication />
          <GoogleAuthentication />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})

export default AuthButtons;
