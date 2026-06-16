import { StyleSheet } from 'react-native';
import { Colors, Fonts, Typography } from '../../constant';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 40,
    height: hp(5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButtonContainer: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.SECONDARY[200],
    borderWidth: 1,
    borderColor: Colors.SECONDARY[200],
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontFamily: Fonts.Bold,
    fontSize: 12,
    color: Colors.PRIMARY[300],
    textAlign: 'center',
  },
  disabledBtnText: {
    ...Typography.BodyBold14,
  },
  indicatorStyle: {
    width: '100%',
    justifyContent: 'center',
  },
  touchableOpacityStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconStyle: {
    width: 20,
    height: 20,
    right: wp(3),
    resizeMode: 'contain',
    tintColor: Colors.PRIMARY[300],
  },
  fileSizeText: {
    fontFamily: Fonts.Regular,
    fontSize: 12,
    color: Colors.PRIMARY[300],
    marginLeft: wp(3),
  },
});

export default styles;
