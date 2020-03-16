/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StatusBar, StyleSheet, Text, Image, View } from 'react-native';
import Routes from './src/settings/Routes';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#D9F2FA" />
      <Routes />
    </>
  );
};

export default App;
