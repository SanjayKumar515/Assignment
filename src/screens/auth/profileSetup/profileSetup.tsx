import React, { FC, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { CustomTextInput, Button } from '../../../components';
import { Icon } from '../../../constant';
import { AuthStackProps } from '../../../@types';
import styles from './profileSetup.styles';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import { UserService } from '../../../service/apiService';
import { showSuccess, showError } from '../../../components/Flashmessge';
import { CommonLoader } from '../../../components/CommonLoader/commonLoader';
import { LocalStorage } from '../../../helpers/localstorage';
import { UserData, UserDataContext } from '../../../context/userDataContext';
import Modal from 'react-native-modal';

type ProfileSetupNavigationProp = NativeStackNavigationProp<
  AuthStackProps,
  'ProfileSetup'
>;
type ProfileSetupRouteProp = RouteProp<AuthStackProps, 'ProfileSetup'>;

const ProfileSetup: FC = () => {
  const navigation = useNavigation<ProfileSetupNavigationProp>();
  const route = useRoute<ProfileSetupRouteProp>();
  const signupData = route.params?.signupData || {};

  const { setUserData } = useContext<UserData>(UserDataContext);

  const [name, setName] = useState(signupData.name || '');

  const [profileImage, setProfileImage] = useState<Asset | null>(null);

  const [dob, setDob] = useState('');
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  // Gender state
  const [gender, setGender] = useState('');

  const { showLoader, hideLoader } = CommonLoader();

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });
    if (result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0]);
    }
  };

  const handleNext = async () => {
    try {
      showLoader();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', signupData.email || '');
      formData.append('phonecode', signupData.phonecode || '+1');
      formData.append('phone', signupData.phone || '');
      formData.append('password', signupData.password || '');
      formData.append(
        'password_confirmation',
        signupData.password_confirmation || '',
      );
      if (dob) formData.append('dob', dob);
      if (gender) formData.append('gender', gender);
      if (profileImage && profileImage.uri) {
        formData.append('profile_image', {
          uri: profileImage.uri,
          type: profileImage.type || 'image/jpeg',
          name: profileImage.fileName || 'profile.jpg',
        } as any);
      }
      const response = await UserService.registerUserWithForm(formData);

      if ((response && response.status === 200) || response?.status === 201) {
        if (response.data) {
          await LocalStorage.save('@user', response.data);
          await LocalStorage.save('@login', JSON.stringify(true));
          setUserData(response.data);
        }

        hideLoader();
        showSuccess('Account created successfully!');
        navigation.navigate('SetupSuccess');
      } else {
        showError('Registration failed. Please try again.');
        hideLoader();
      }
    } catch (error: any) {
      console.log('Register API error', error?.response?.data || error);
      let errorMessage = 'An unexpected error occurred during registration.';
      if (error?.response?.data) {
        if (error.response.data.errors) {
          const firstErrorKey = Object.keys(error.response.data.errors)[0];
          errorMessage = error.response.data.errors[firstErrorKey][0];
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      showError(errorMessage);
      hideLoader();
    }
  };

  return (
    <LinearGradient
      colors={['#F2DFC0', '#FFFFFF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.3 }}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(2) }}
        enableOnAndroid={true}
        extraScrollHeight={hp(5)}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Tell us about you</Text>
          </View>
          <Text style={styles.subtitle}>We'll personalise your experience</Text>

          <View style={styles.avatarContainer}>
            <TouchableOpacity
              onPress={handlePickImage}
              activeOpacity={0.8}
              style={styles.avatarImage}
            >
              {profileImage?.uri ? (
                <Image
                  source={{ uri: profileImage.uri }}
                  style={{
                    width: wp(24),
                    height: wp(24),
                    borderRadius: wp(12),
                  }}
                />
              ) : (
                <Icon family="Feather" name="user" size={wp(10)} color="#999" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={handlePickImage}
            >
              <Icon family="Feather" name="camera" size={12} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.allTextInputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <CustomTextInput
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
              inputStyle={styles.input}
              style={styles.textInputContainer}
              borderWidth={1}
              borderColor="#e0e0e0"
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOpenDatePicker(true)}
            >
              <View pointerEvents="none">
                <CustomTextInput
                  placeholder="YYYY-MM-DD"
                  value={dob}
                  editable={false}
                  placeholderTextColor="#999"
                  inputStyle={styles.input}
                  style={styles.textInputContainer}
                  borderWidth={1}
                  borderColor="#e0e0e0"
                  rightIcon={
                    <Icon
                      family="Feather"
                      name="calendar"
                      size={18}
                      color="#000"
                    />
                  }
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.label}>Gender</Text>
            <CustomTextInput
              placeholder="e.g. Male / Female"
              value={gender}
              onChangeText={setGender}
              placeholderTextColor="#999"
              inputStyle={styles.input}
              style={styles.textInputContainer}
              borderWidth={1}
              borderColor="#e0e0e0"
              rightIcon={
                <Icon
                  family="Feather"
                  name="chevron-down"
                  size={18}
                  color="#000"
                />
              }
            />
          </View>

          <Button
            onPress={handleNext}
            title="Next"
            buttonColor="#b85e00"
            buttonWidth={wp(88)}
            style={styles.nextButton}
          />
        </View>

        <Modal
          isVisible={openDatePicker}
          onBackdropPress={() => setOpenDatePicker(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.5}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: wp(4),
              padding: wp(5),
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: wp(4.5),
                fontFamily: 'Urbanist-Bold',
                marginBottom: hp(2),
              }}
            >
              Select Date of Birth
            </Text>
            <DatePicker date={date} mode="date" onDateChange={setDate} textColor="#000000" theme="light" />
            <Button
              onPress={() => {
                setOpenDatePicker(false);
                const formattedDate = date.toISOString().split('T')[0];
                setDob(formattedDate);
              }}
              title="Confirm"
              buttonColor="#b85e00"
              buttonWidth={wp(80)}
              style={{ marginTop: hp(3) }}
            />
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

export default ProfileSetup;
