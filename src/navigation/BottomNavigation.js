import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/main/tabs/home/HomeScreen';
import FavouriteScreenNoItem from '../screens/main/tabs/favourite/FavouriteScreenNoItem';
import NotificationScreen from '../screens/main/tabs/notification/NotificationScreen';
import SettingLoggedScreen from '../screens/main/tabs/setting/SettingLoggedScreen';
import {ROUTES} from '../constants/routes';
import colors from '../constants/colors';
import SlideChangeText from '../components/common/slide/SlideChangeText';
import IcHome from '../assets/icons/bottom_tab/Ic_home';
import IcVoucher from '../assets/icons/bottom_tab/Ic_voucher';
import IcProfile from '../assets/icons/bottom_tab/ic_profile';
import IcFavorite from '../assets/icons/bottom_tab/Ic_favorite';

import FavoriteScreen from '../screens/main/tabs/favourite/FavoriteScreen';
import FavouriteScreenNoLogin from '../screens/main/tabs/favourite/FavouriteScreenNoLogin';
import Voucher from '../screens/main/stacks/voucher/Voucher'
import { useSelector } from 'react-redux';
import SearchScreen from '../screens/main/tabs/Sreach/SearchScreen';
import SettingScreen from '../screens/main/stacks/profile/ProfileNologin';
import ProfileScreen from '../screens/main/stacks/profile/ProfileScreen';


const Tab = createBottomTabNavigator();

function CustomBottom({onPress, children}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground
        style={{
          width: 95,
          height: 95,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../assets/images/imgButtonTab.png')}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.onPrimary,
          }}>
          <View
            style={{
              backgroundColor: colors.primary_200,
              width: 60,
              height: 60,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: colors.onPrimary,
            }}>
            {children}
          </View>
          <SlideChangeText />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const ButtomNavigation = () => {
  const {isLogin} = useSelector(state => state.reducer.auth);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.onPrimary,
          position: 'absolute',
          shadowColor: colors.onPrimary,
          height: 90,
        },
      }}>
      <Tab.Screen
        name={ROUTES.home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                borderTopWidth: focused ? 1 : 0,
                borderTopColor: focused ? colors.primary : colors.onPrimary,
                height: 90,
              }}>
              <IcHome />
              <Text style={{fontSize: 8}}>{ROUTES.voucher}</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Voucher}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              borderTopWidth: focused ? 2 : 0,
              borderTopColor: focused ? colors.primary : colors.onPrimary,
              height: 90,
              // backgroundColor:colors.primary
            }}>
              <IcVoucher />
              <Text>Uu dai</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="yeuthich"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={require('../assets/icons/SearchIcon.png')}
                style={{
                  tintColor: colors.onPrimary,
                }}
              />
            </View>
          ),
          tabBarButton: props => <CustomBottom {...props} />,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={isLogin ? FavoriteScreen : FavouriteScreenNoLogin}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: focused ? colors.primary : colors.onPrimary,
                height: 90,

                // backgroundColor:colors.primary
              }}>
              <IcFavorite />
              <Text>{ROUTES.favorite}</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={isLogin ? SettingLoggedScreen :SettingScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: focused ? colors.primary : colors.onPrimary,
                height: 90,

                // backgroundColor:colors.primary
              }}>
              <IcProfile />
              <Text>{ROUTES.settings}</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ButtomNavigation;
