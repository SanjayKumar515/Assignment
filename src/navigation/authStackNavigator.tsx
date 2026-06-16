import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Signin, Onboarding, Signup, ProfileSetup, SetupSuccess } from '../screens';
import { AuthStackProps } from '../@types';

const AuthStackNavigator: FC = () => {
  const AuthStack = createNativeStackNavigator<AuthStackProps>();

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
      <AuthStack.Screen name="Signin" component={Signin} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="ProfileSetup" component={ProfileSetup} />
      <AuthStack.Screen name="SetupSuccess" component={SetupSuccess} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
