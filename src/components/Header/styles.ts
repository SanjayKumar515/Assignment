import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors, Typography} from '../../constant';

const styles = StyleSheet.create({
  profileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashboardText: {
    color: Colors.PRIMARY[500],
    marginTop: hp(1),
    ...Typography.H2Semibold28,
  },
  profilePictureView: {
    width: 55,
    height: 55,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    height: 55,
    width: 55,
    resizeMode: 'contain',
    borderRadius: wp(50),
    borderWidth: 1,
    borderColor: Colors.PRIMARY[300],
    overflow: 'hidden',
  },
});

export default styles;
