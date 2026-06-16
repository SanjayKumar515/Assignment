import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/index';
import { Icon, Colors, Fonts } from '../constant';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Stubs for Tools, Plan, Meeting so they display beautifully
const ToolsPlaceholder: FC = () => (
  <View style={styles.placeholderContainer}>
    <Icon family="Feather" name="grid" size={50} color="#b85e00" />
    <Text style={styles.placeholderTitle}>Tools</Text>
    <Text style={styles.placeholderText}>Access your recovery tools here.</Text>
  </View>
);

const PlanPlaceholder: FC = () => (
  <View style={styles.placeholderContainer}>
    <Icon family="Feather" name="calendar" size={50} color="#b85e00" />
    <Text style={styles.placeholderTitle}>Your Plan</Text>
    <Text style={styles.placeholderText}>View your upcoming schedule.</Text>
  </View>
);

const MeetingPlaceholder: FC = () => (
  <View style={styles.placeholderContainer}>
    <Icon family="Feather" name="user" size={50} color="#b85e00" />
    <Text style={styles.placeholderTitle}>Meetings</Text>
    <Text style={styles.placeholderText}>
      Join support groups and meetings.
    </Text>
  </View>
);

// Dummy screen for Help just to satisfy the navigator requirement
const HelpPlaceholder: FC = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderTitle}>Help Resources</Text>
  </View>
);

const CustomHelpButton = ({ onPress }: any) => (
  <TouchableOpacity
    style={styles.customHelpButtonWrapper}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.customHelpButton}>
      <Icon family="Feather" name="phone-call" size={24} color="#fff" />
      <Text style={styles.customHelpButtonText}>Need Help{'\n'}Now</Text>
    </View>
  </TouchableOpacity>
);

const Tab = createBottomTabNavigator();

const BottomStackNavigator: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#b85e00',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: hp(8),
          paddingBottom: hp(1.5),
          paddingTop: hp(1),
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        tabBarLabelStyle: {
          fontSize: wp(3),
          fontFamily: Fonts.Medium,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'Tools') {
            iconName = 'server'; // Closest to the list icon in Feather
          } else if (route.name === 'Plan') {
            iconName = 'calendar';
          } else if (route.name === 'Meeting') {
            iconName = 'user';
          }

          if (route.name === 'HelpTab') return null; // Icon is handled by custom button

          return (
            <Icon
              family={'Feather'}
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={Home} options={{ title: 'Home' }} />
      <Tab.Screen
        name="Tools"
        component={ToolsPlaceholder}
        options={{ title: 'Tools' }}
      />
      <Tab.Screen
        name="HelpTab"
        component={HelpPlaceholder}
        options={{
          tabBarLabel: () => null,
          tabBarButton: props => <CustomHelpButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Plan"
        component={PlanPlaceholder}
        options={{ title: 'Plan' }}
      />
      <Tab.Screen
        name="Meeting"
        component={MeetingPlaceholder}
        options={{ title: 'Meeting' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  placeholderTitle: {
    fontSize: wp(6),
    fontFamily: Fonts.Bold,
    color: '#000',
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  placeholderText: {
    fontSize: wp(4),
    fontFamily: Fonts.Regular,
    color: '#666',
    textAlign: 'center',
  },
  customHelpButtonWrapper: {
    top: hp(-3),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  customHelpButton: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customHelpButtonText: {
    color: '#fff',
    fontFamily: Fonts.Bold,
    fontSize: wp(2.5),
    textAlign: 'center',
    marginTop: hp(0.5),
  },
});

export default BottomStackNavigator;
