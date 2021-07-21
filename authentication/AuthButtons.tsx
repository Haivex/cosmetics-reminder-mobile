import React from 'react';
import AppleAuthentication from './AppleAuthentication';
import FacebookAuthentication from './FacebookAuthentication';
import FacebookDevelopmentAuthentication from './FacebookDevelopmentAuthentication';
import GoogleAuthentication from './GoogleAuthentication';
import GoogleDevelopmentAuthentication from './GoogleDevelopmentAuthentication';

const AuthButtons = () => {
  return (
    <>
      {process.env.IS_DEV ? (
        <>
            <AppleAuthentication />
            <FacebookDevelopmentAuthentication />
            <GoogleDevelopmentAuthentication />
        </>
      ) : (
        <>
          <AppleAuthentication />
          <FacebookAuthentication />
          <GoogleAuthentication />
        </>
      )}
    </>
  );
};

export default AuthButtons;
