import * as React from 'react';
import { Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './Home';
import Products from './Products';
import Detail from './Detail';

const stack = createStackNavigator(
  {
    Home: { screen: Home },
    Products: { screen: Products },
    Detail: { screen: Detail },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(stack);