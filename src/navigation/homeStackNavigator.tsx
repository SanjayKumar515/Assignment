import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackProps } from '../@types';
import { Home } from '../screens/index';
import BottomStackNavigator from './bottomStackNavigator';

const HomeStackNavigator: FC = () => {
  const HomeStack = createNativeStackNavigator<HomeStackProps>();

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="BottomStackNavigator"
        component={BottomStackNavigator}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Dashboard" component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
