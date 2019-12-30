import React from 'react';
import { Image } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack';

import logo from '~/assets/images/logo-horizontal.png';

import SignIn from './pages/SignIn';

import Checkins from './pages/Checkins';
import Supports from './pages/Supports';
import NewSupport from './pages/NewSupport';
import SupportAnswer from './pages/SupportAnswer';

const Tab = createBottomTabNavigator(
  {
    Checkins,
    Supports,
  },
  {
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: '#EE4E62',
    },
  }
);

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createStackNavigator(
          {
            Home: {
              screen: Tab,
            },
            NewSupport,
            SupportAnswer,
          },
          {
            headerLayoutPreset: 'center',
            headerBackTitleVisible: false,
            defaultNavigationOptions: {
              headerTitle: <Image source={logo} />,
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
