import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenStackNavigation from './screens/authen/AuthenStackNavigation';
import {AppContext} from './screens/AppContext';
import TabNavigation from './navigation/MainStaskNavigation';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

const AppNavigation = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigation;
