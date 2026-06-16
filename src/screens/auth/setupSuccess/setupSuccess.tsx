import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Button } from '../../../components';
import { Icon } from '../../../constant';
import { AuthStackProps } from '../../../@types';
import styles from './setupSuccess.styles';
import { UserData, UserDataContext } from '../../../context/userDataContext';
import { useContext } from 'react';

type SetupSuccessNavigationProp = NativeStackNavigationProp<
  AuthStackProps,
  'SetupSuccess'
>;

const SetupSuccess: FC = () => {
  const navigation = useNavigation<SetupSuccessNavigationProp>();
  const { setIsLoggedIn } = useContext<UserData>(UserDataContext);

  const handleGoHome = () => {
    setIsLoggedIn(true);
  };

  return (
    <LinearGradient
      colors={['#F2DFC0', '#FFFFFF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.3 }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon family="Feather" name="check" size={wp(20)} color="#fff" />
        </View>

        <Text style={styles.title}>You're all set!</Text>
        <Text style={styles.subtitle}>
          Let's start your journey to{'\n'}a better you.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleGoHome}
            title="Go to Home"
            buttonColor="#b85e00"
            buttonWidth={wp(88)}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default SetupSuccess;
