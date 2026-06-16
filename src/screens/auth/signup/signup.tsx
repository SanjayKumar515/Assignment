import {
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, { FC, useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showSuccess, showError } from '../../../components/Flashmessge/index';
import { CommonLoader } from '../../../components/CommonLoader/commonLoader';
import styles from './signup.styles';
import { UserService, getCountryCode } from '../../../service/apiService';
import {
  Button,
  CustomTextInput,
  CountryPickerModal,
  TextView,
} from '../../../components';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fonts, Icon } from '../../../constant';
import { AuthStackProps } from '../../../@types';

type SignupNavigationProp = NativeStackNavigationProp<AuthStackProps, 'Signup'>;

const Signup: FC = () => {
  const navigation = useNavigation<SignupNavigationProp>();

  // Refs for focusing next input
  const emailRef = useRef<any>(null);
  const phoneCodeRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);

  const [phoneCode, setPhoneCode] = useState('+1');
  const [isSecure, setIsSecure] = useState(true);
  const [isSecureConfirm, setIsSecureConfirm] = useState(true);

  // Country Picker State
  const [countries, setCountries] = useState<any[]>([]);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const { showLoader, hideLoader } = CommonLoader();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await getCountryCode.getCountries();
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.countries
      ) {
        const fetchedCountries = response.data.data.countries;
        setCountries(fetchedCountries);
        // Find default country (+1 usually US or Canada)
        const defaultCountry = fetchedCountries.find(
          (c: any) => c.iso_alpha2 === 'US' || c.phonecode === '+1',
        );
        if (defaultCountry) {
          setSelectedCountry(defaultCountry);
        }
      }
    } catch (error) {
      console.log('Error fetching countries:', error);
    }
  };

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email address is required'),
    phone: Yup.string()
      .test(
        'is-valid-phone',
        'Please enter a valid phone number (at least 10 digits)',
        value => {
          if (!value) return false;
          return /^\d{10,}$/.test(value.replace(/\D/g, ''));
        },
      )
      .required('Phone number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'You must accept the terms and privacy policy')
      .required('You must accept the terms and privacy policy'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    validationSchema: signupSchema,
    onSubmit: async values => {
      try {
        showLoader();

        const payload = {
          name: values.name,
          email: values.email,
          phonecode: phoneCode,
          phone: values.phone,
          password: values.password,
          password_confirmation: values.confirmPassword,
        };

        hideLoader();
        navigation.navigate('ProfileSetup', { signupData: payload });
      } catch (error: any) {
        console.log('error', error?.response?.data || error);

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
      } finally {
        hideLoader();
      }
    },
  });

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
        keyboardShouldPersistTaps="always"
        bounces={false}
      >
        <View style={[styles.container]}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Create Account</Text>
          </View>

          <Text style={styles.subtitle}>
            Register to create your account and start your journey with us
          </Text>

          <View style={styles.allTextInputContainer}>
            <Text style={styles.label}>Name</Text>
            <CustomTextInput
              placeholder="E.g. Ethan Miller"
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              // onBlur={formik.handleBlur('name')}
              placeholderTextColor="#999"
              inputStyle={styles.input}
              style={styles.textInputContainer}
              borderWidth={1}
              borderColor={
                formik.touched.name && formik.errors.name ? 'red' : '#e0e0e0'
              }
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />
            {formik.touched.name && formik.errors.name && (
              <Text style={styles.errorText}>{formik.errors.name}</Text>
            )}

            <Text style={styles.label}>Email Address</Text>
            <CustomTextInput
              ref={emailRef}
              placeholder="E.g. ethanmiller@xyz.com"
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              // onBlur={formik.handleBlur('email')}
              placeholderTextColor="#999"
              inputStyle={styles.input}
              style={styles.textInputContainer}
              borderWidth={1}
              borderColor={
                formik.touched.email && formik.errors.email ? 'red' : '#e0e0e0'
              }
              returnKeyType="next"
              onSubmitEditing={() => phoneCodeRef.current?.focus()}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.errorText}>{formik.errors.email}</Text>
            )}

            <Text style={styles.label}>Mobile Number</Text>
            <View
              style={[
                styles.phoneContainer,
                {
                  borderColor:
                    formik.touched.phone && formik.errors.phone
                      ? 'red'
                      : '#e0e0e0',
                },
              ]}
            >
              <TouchableOpacity
                style={styles.countryCodeContainer}
                activeOpacity={0.5}
                onPress={() => {
                  // Keyboard.dismiss();
                  setShowCountryModal(true);
                }}
              >
                {selectedCountry?.flag_url ? (
                  <Image
                    source={{ uri: selectedCountry.flag_url }}
                    style={{
                      width: 24,
                      height: 16,
                      marginRight: 6,
                      borderRadius: 40,
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.flag}>🇺🇸</Text>
                )}
                <Icon
                  family="Feather"
                  name="chevron-down"
                  size={16}
                  color="#999"
                />
              </TouchableOpacity>

              <Text style={styles.countryCode}>{phoneCode}</Text>

              <TextInput
                ref={phoneRef}
                value={formik.values.phone}
                onChangeText={formik.handleChange('phone')}
                onBlur={formik.handleBlur('phone')}
                maxLength={10}
                placeholder="(424) 202-1430"
                placeholderTextColor="#8E8E8E"
                keyboardType="phone-pad"
                style={styles.phoneInput}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>
            {formik.touched.phone && formik.errors.phone && (
              <Text style={styles.errorText}>{formik.errors.phone}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <CustomTextInput
              ref={passwordRef}
              placeholder="********"
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              // onBlur={formik.handleBlur('password')}
              isSecure={isSecure}
              onSecureTextPress={() => setIsSecure(!isSecure)}
              placeholderTextColor="#999"
              inputStyle={styles.input}
              style={styles.textInputContainer}
              borderWidth={1}
              borderColor={
                formik.touched.password && formik.errors.password
                  ? 'red'
                  : '#e0e0e0'
              }
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}

            <Text style={styles.label}>Confirm Password</Text>
            <CustomTextInput
              ref={confirmPasswordRef}
              placeholder="********"
              value={formik.values.confirmPassword}
              onChangeText={formik.handleChange('confirmPassword')}
              // onBlur={formik.handleBlur('confirmPassword')}
              isSecure={isSecureConfirm}
              onSecureTextPress={() => setIsSecureConfirm(!isSecureConfirm)}
              placeholderTextColor="#999"
              inputStyle={styles.input}
              style={styles.textInputContainer}
              borderWidth={1}
              borderColor={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'red'
                  : '#e0e0e0'
              }
              returnKeyType="done"
              onSubmitEditing={() => formik.handleSubmit()}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {formik.errors.confirmPassword}
                </Text>
              )}
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              activeOpacity={0.7}
              onPress={() =>
                formik.setFieldValue(
                  'termsAccepted',
                  !formik.values.termsAccepted,
                )
              }
            >
              {formik.values.termsAccepted ? (
                <Icon
                  family="Feather"
                  name="check-square"
                  size={24}
                  color="#b85e00"
                />
              ) : (
                <Icon family="Feather" name="square" size={24} color="#999" />
              )}
            </TouchableOpacity>
            <TextView style={styles.termsText}>
              By continuing you agree to our{' '}
              <TextView style={{ fontFamily: Fonts.Bold }}>
                terms & conditions
              </TextView>{' '}
              and{' '}
              <TextView style={{ fontFamily: Fonts.Bold }}>
                privacy policy
              </TextView>
            </TextView>
          </View>
          {formik.touched.termsAccepted && formik.errors.termsAccepted && (
            <Text style={[styles.errorText, { marginLeft: 0 }]}>
              {formik.errors.termsAccepted as string}
            </Text>
          )}

          <Button
            onPress={formik.handleSubmit}
            title="Create Account"
            buttonColor="#b85e00"
            buttonWidth={wp(88)}
            style={styles.signUpButton}
          />

          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.registerText}
              onPress={() => navigation.navigate('Signin')}
            >
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>

      {/* Country Picker Modal */}
      <CountryPickerModal
        visible={showCountryModal}
        countries={countries}
        onClose={() => setShowCountryModal(false)}
        onSelect={item => {
          setPhoneCode(item.phonecode);
          setSelectedCountry(item);
          setShowCountryModal(false);
          phoneRef.current?.focus();
        }}
      />
    </LinearGradient>
  );
};

export default Signup;
