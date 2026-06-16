import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../constant';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    marginTop: hp(1),
  },
  label: {
    fontSize: 14,
    color: Colors.PRIMARY[100],
    marginBottom: 8,
    fontFamily: Fonts.SemiBold,
    marginLeft: wp(2),
  },
  inputContainer: {
    flexDirection: 'row',
    width: wp(90),
    alignItems: 'center',
    paddingHorizontal: 12,
    minHeight: hp(5),
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    color: Colors.PRIMARY[100],
    fontFamily: Fonts.Regular,
  },
  secureButton: {
    padding: 8,
  },
  error: {
    color: Colors.ERROR[100],
    fontSize: 12,
    marginTop: 4,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: Colors.PRIMARY[100],
  },
  statusIcon: {
    marginHorizontal: 8,
  },
});
