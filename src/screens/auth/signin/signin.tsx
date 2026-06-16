import { Text, View, TouchableOpacity, Switch } from 'react-native';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackProps } from '../../../@types';
import { showSuccess, showError } from '../../../components/Flashmessge/index';
import { UserData, UserDataContext } from '../../../context/userDataContext';
import { CommonLoader } from '../../../components/CommonLoader/commonLoader';
import { LocalStorage } from '../../../helpers/localstorage';
import styles from './signin.styles';
import { UserService } from '../../../service';
import { Button, CustomTextInput } from '../../../components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from '../../../constant';
import LinearGradient from 'react-native-linear-gradient';

const Signin: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackProps, 'Signin'>>();
  const { setIsLoggedIn, setUserData } = useContext<UserData>(UserDataContext);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const [isSecure, setIsSecure] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const { showLoader, hideLoader } = CommonLoader();

  useEffect(() => {
    const checkStoredUser = async () => {
      const storedUrl = await LocalStorage.read('@user');
      if (storedUrl && typeof storedUrl === 'string') {
        setUserData(storedUrl);
        setIsLoggedIn(true);
      }
    };
    checkStoredUser();
  }, [setIsLoggedIn, setUserData]);

  const signinSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email address is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: signinSchema,
    onSubmit: async values => {
      try {
        const payload = {
          email: values.email,
          password: values.password,
          remember_me: rememberMe,
        };
        showLoader();
        await UserService.loginUser(JSON.stringify(payload)).then(
          async response => {
            if (
              response &&
              (response.status === 200 || response.status === 201)
            ) {
              const userData = response.data;
              await LocalStorage.save('@user', userData);
              await LocalStorage.save('@login', JSON.stringify(true));
              setUserData(userData);
              hideLoader();
              setIsLoggedIn(true);
              showSuccess('Login Successfully..');
            } else {
              showError('Invalid Username or Password');
              hideLoader();
            }
          },
        );
      } catch (error) {
        showError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred during login.',
        );
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
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton}>
              <Icon
                family="Feather"
                name="chevron-left"
                size={24}
                color="#000"
              />
            </TouchableOpacity>
            <Text style={styles.title}>Welcome Back</Text>
          </View>

          <Text style={styles.subtitle}>
            Stay connected by signing in with you email and password to access
            your account
          </Text>

          <View style={styles.allTextInputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <CustomTextInput
              placeholder="E.g. ethanmiller@xyz.com"
              value={formik.values.email}
              ref={emailRef}
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
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.errorText}>{formik.errors.email}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <CustomTextInput
              ref={passwordRef}
              placeholder="********"
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              //onBlur={formik.handleBlur('password')}
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
              returnKeyType="done"
              onSubmitEditing={() => formik.handleSubmit()}
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
          </View>

          <View style={styles.rowOptions}>
            <View style={styles.rememberRow}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: '#d3d3d3', true: '#b85e00' }}
                thumbColor={'#fff'}
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Button
            onPress={formik.handleSubmit}
            title="Sign in"
            buttonColor="#b85e00"
            buttonWidth={wp(88)}
            style={styles.signInButton}
          />

          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text
              style={styles.registerText}
              onPress={() => navigation.navigate('Signup')}
            >
              Register
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

export default Signin;
