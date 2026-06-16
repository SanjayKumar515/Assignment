import { StyleSheet, Platform } from 'react-native';
import { Colors, Fonts } from '../../../constant';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    justifyContent: 'center',
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  allTextInputContainer: {
    marginTop: hp(1),
  },
  label: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
    color: '#333',
    marginBottom: hp(0.5),
  },
  textInputContainer: {
    backgroundColor: '#fff',
    borderRadius: wp(8),
    marginBottom: hp(0.5),
    height: hp(6.5),
  },
  input: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: '#000',
  },
  signUpButton: {
    marginTop: hp(2),
    marginBottom: hp(1),
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
    color: '#000',
    textAlign: 'center',
  },
  registerText: {
    color: '#b85e00',
    fontFamily: Fonts.Bold,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(6.5),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: wp(8),
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),
    marginTop: hp(1),
    marginBottom: hp(0.5),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: wp(2.5),
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  flag: {
    fontSize: 18,
    marginRight: wp(1.5),
  },
  countryCode: {
    fontSize: 14,
    color: '#000',
    marginLeft: wp(3),
    marginRight: wp(2),
    fontFamily: Fonts.Regular,
  },
  phoneInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 0,
    fontFamily: Fonts.Regular,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.Regular,
    marginBottom: hp(1),
    marginLeft: wp(2),
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  checkbox: {
    marginRight: wp(3),
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    fontFamily: Fonts.Medium,
  },
});

export default styles;
