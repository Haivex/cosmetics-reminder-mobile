import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppleAuthentication from './AppleAuthentication';
import FacebookAuthentication from './FacebookAuthentication';
import FacebookDevelopmentAuthentication from './FacebookDevelopmentAuthentication';
import GoogleAuthentication from './GoogleAuthentication';
import GoogleDevelopmentAuthentication from './GoogleDevelopmentAuthentication';

const AuthButtons = () => {
  return (
    <>
      {process.env.IS_DEV ? (
        <View style={styles.container}>
            <AppleAuthentication />
            <FacebookDevelopmentAuthentication />
            <GoogleDevelopmentAuthentication />
        </View>
      ) : (
        <View style={styles.container}> 
          <AppleAuthentication />
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
