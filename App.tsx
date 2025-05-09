import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store.js';
import { AppProvider } from './src/screens/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/AppNavigation';
import Purchasehistory from './src/screens/main/stacks/purchasehistory/Purchasehistory.js';
import OrderInformation from './src/screens/main/stacks/orderinformation/Orderinformation.js'
import SettingLoggedScreen from './src/screens/main/tabs/setting/SettingLoggedScreen.js';
import LichTrinhs from './src/screens/main/stacks/schedule/LichTrinhs.js';


const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>

        <AppNavigation />
        {/* <LichTrinhs></LichTrinhs> */}

      </AppProvider>

    </Provider>
  );
};

export default App;

