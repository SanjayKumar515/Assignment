import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts } from '../../../constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(8),
  },
  headerRow: {
    marginBottom: hp(1),
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: wp(8),
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.Regular,
    fontSize: wp(4),
    color: '#666',
    textAlign: 'center',
    marginBottom: hp(5),
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: hp(4),
    position: 'relative',
  },
  avatarImage: {
    width: wp(24),
    height: wp(24),
    borderRadius: wp(12),
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#b85e00',
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  label: {
    fontFamily: Fonts.Medium,
    fontSize: wp(3.5),
    color: '#000',
    marginBottom: hp(1),
  },
  textInputContainer: {
    marginBottom: hp(2),
    backgroundColor: '#fff',
  },
  input: {
    fontFamily: Fonts.Regular,
    fontSize: wp(4),
    color: '#000',
  },
  nextButton: {
    marginTop: hp(4),
    alignSelf: 'center',
  },
  allTextInputContainer: {
    width: '100%',
  },
});

export default styles;
