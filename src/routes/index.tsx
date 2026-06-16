import React, { FC, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { UserData, UserDataContext } from '../context/userDataContext';
import { LocalStorage } from '../helpers/localstorage';
import { AuthStackNavigator, HomeStackNavigator } from '../navigation';
import { Colors, ResponsiveStatusBar } from '../constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Stack = createNativeStackNavigator();

const Route: FC = () => {
  const [userLogin, setUserLogin] = useState<boolean | null>(null);
  const { isLoggedIn } = useContext<UserData>(UserDataContext);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    getAsync();
  }, [isLoggedIn]);

  const getAsync = async () => {
    try {
      const val = await LocalStorage.read('@login');
      setUserLogin(!!val);
    } catch (error) {
      setUserLogin(false);
    } finally {
      setTimeout(() => SplashScreen.hide(), 500);
    }
  };

  // Network check
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return unsubscribe;
  }, []);

  // Loading state (prevents UI jump)
  if (userLogin === null) {
    return (
      <LinearGradient
      colors={['#F2DFC0', '#FFFFFF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.3 }}
      style={{ flex: 1 }}
    >
        <ResponsiveStatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true}
        />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: Colors.PRIMARY[200] }}
          edges={['left', 'right', 'bottom']}
        >
          <Image
            source={require('../assets/images/splash.jpg')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (isOffline) {
    return (
     <LinearGradient
      colors={['#F2DFC0', '#FFFFFF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.3 }}
      style={{ flex: 1 }}
    >
        <ResponsiveStatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true}
        />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Colors.PRIMARY[200],
            justifyContent: 'center',
            alignItems: 'center',
          }}
          edges={['left', 'right', 'bottom']}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>You are offline.</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#F2DFC0', '#FFFFFF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.3 }}
      style={{ flex: 1 }}
    >
      <ResponsiveStatusBar
        backgroundColor="transparent"
        barStyle="default"
        translucent={true}
      />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userLogin ? (
            <Stack.Screen
              name="HomeStackNavigator"
              component={HomeStackNavigator}
            />
          ) : (
            <Stack.Screen
              name="AuthStackNavigator"
              component={AuthStackNavigator}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
};

export default Route;
