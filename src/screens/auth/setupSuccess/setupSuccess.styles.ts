import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts } from '../../../constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
  },
  iconContainer: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(17.5),
    backgroundColor: '#b85e00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(4),
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: wp(7.5),
    color: '#000',
    textAlign: 'center',
    marginBottom: hp(1.5),
  },
  subtitle: {
    fontFamily: Fonts.Regular,
    fontSize: wp(4.5),
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: wp(5),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: hp(5),
    width: '100%',
    alignItems: 'center',
  },
});

export default styles;
