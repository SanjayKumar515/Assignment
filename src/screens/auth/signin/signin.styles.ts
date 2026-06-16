import { StyleSheet, Platform } from 'react-native';
import { Fonts } from '../../../constant';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
    marginTop: hp(3),
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? hp(8) : hp(5),
    marginBottom: hp(2),
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight: wp(4),
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.Bold,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: '#6b6b6b',
    lineHeight: 22,
    marginBottom: hp(4),
  },
  allTextInputContainer: {
    width: '100%',
  },
  label: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
    marginLeft: 0,
  },
  textInputContainer: {
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: hp(2.5),
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    fontFamily: Fonts.Regular,
  },
  rowOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(4),
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
    color: '#000',
    marginLeft: 8,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
    color: '#000',
    textDecorationLine: 'underline',
  },
  signInButton: {
    marginTop: hp(4),
    marginBottom: hp(3),
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
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.Regular,
    marginTop: hp(-1),
    marginBottom: hp(1),
    marginLeft: wp(2),
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: hp(40),
  },
});

export default styles;
