import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store.js';
import { AppProvider } from './src/screens/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/AppNavigation';
import Orderinformation from './src/screens/main/stacks/orderinformation/Orderinformation.js'

const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <Orderinformation />
      </AppProvider>
    </Provider>
  );
};

export default App;

