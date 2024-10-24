import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Login/LoginScreen';
import RegisterScreen from './Register/RegisterScreen';
import ForgotScreen from './Forgot/ForgotScreen';
import Otp from './Otp/Otp';
import LoginRegisterScreen from './LoginRegisterScreen';
import MainStaskNavigation from '../../navigation/MainStaskNavigation';
import FavouriteScreenNoItem from '../../screens/main/tabs/favourite/FavouriteScreenNoItem';
import FavoriteScreen from '../../screens/main/tabs/favourite/FavoriteScreen';
import TestFavoriteAddDelete from '../main/tabs/favourite/TestFavoriteAddDelete';
import SplashScreen from './Splash/SplashScreen';
import SearchScreen from '../main/tabs/Sreach/SearchScreen';
import FilterScreen from '../main/stacks/Filter/FilterScreen';

const Stack = createNativeStackNavigator();

const AuthenStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* You can uncomment the screens as needed */}
      {/* <Stack.Screen name="TestFavoriteAddDelete" component={TestFavoriteAddDelete} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} /> */}
      
      {/* Include this if you want to show Login/Register together */}
      <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} />
      
      {/* If login goes directly to Main Navigation */}

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotScreen" component={ForgotScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="MainTabNavigation" component={MainStaskNavigation} />
    </Stack.Navigator>
  );
};

export default AuthenStackNavigation;
