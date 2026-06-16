import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts } from '../../../constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: hp(15), // space for floating button
  },
  // Header
  headerContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(6), // SafeArea or extra padding
    paddingBottom: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greetingTitle: {
    fontFamily: Fonts.Bold,
    fontSize: wp(6.5),
    color: '#000',
    lineHeight: wp(8),
  },
  greetingSubtitle: {
    fontFamily: Fonts.Regular,
    fontSize: wp(3.5),
    color: '#666',
    marginTop: hp(1),
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: hp(1),
  },
  iconWrapper: {
    marginRight: wp(4),
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: wp(2.5),
    fontFamily: Fonts.Bold,
  },
  avatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#eee',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginTop: hp(3),
    marginBottom: hp(1.5),
  },
  sectionTitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: wp(4.5),
    color: '#333',
  },
  sectionAction: {
    fontFamily: Fonts.Medium,
    fontSize: wp(3.5),
    color: '#b85e00',
  },
  checkInGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  checkInCard: {
    width: wp(20),
    aspectRatio: 1,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkInIconWrapper: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  checkInLabel: {
    fontFamily: Fonts.Medium,
    fontSize: wp(2.8),
    color: '#888',
  },
  // Milestone Card
  milestoneCard: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    backgroundColor: '#b85e00', // Solid orange/brown
    borderRadius: wp(4),
    padding: wp(4),
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  milestoneTitle: {
    fontFamily: Fonts.Bold,
    fontSize: wp(4.5),
    color: '#fff',
    marginLeft: wp(2),
  },
  progressBarContainer: {
    height: hp(1),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: wp(2),
    marginBottom: hp(1),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4caf50', // Green
    borderRadius: wp(2),
  },
  milestoneSubtitle: {
    fontFamily: Fonts.Regular,
    fontSize: wp(3.5),
    color: '#fff',
  },
  // Risk Alert
  riskAlertCard: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    flexDirection: 'row',
    padding: wp(4),
    borderWidth: 1,
    borderColor: 'rgba(255,0,0,0.2)',
    backgroundColor: 'rgba(255,0,0,0.02)',
    borderRadius: wp(4),
  },
  riskAlertIconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: 'rgba(255,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  riskAlertContent: {
    flex: 1,
  },
  riskAlertTitle: {
    fontFamily: Fonts.Bold,
    fontSize: wp(3.8),
    color: '#333',
    marginBottom: hp(0.5),
  },
  riskAlertDesc: {
    fontFamily: Fonts.Regular,
    fontSize: wp(3.5),
    color: '#666',
    lineHeight: wp(5),
  },
  // Today's Plan
  planList: {
    paddingHorizontal: wp(5),
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(1.5),
  },
  planCheckbox: {
    marginRight: wp(3),
  },
  planContent: {
    flex: 1,
  },
  planTitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: wp(3.8),
    color: '#333',
    marginBottom: hp(0.5),
  },
  planTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planTimeText: {
    fontFamily: Fonts.Regular,
    fontSize: wp(3.2),
    color: '#999',
    marginLeft: wp(1),
  },
  planAvatar: {
    width: wp(10),
    height: wp(10),
  },
  // Floating Button
  fab: {
    position: 'absolute',
    bottom: hp(2), // Just above tab bar
    alignSelf: 'center',
    backgroundColor: 'red',
    width: wp(22),
    height: wp(22),
    borderRadius: wp(11),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 10,
  },
  fabText: {
    color: '#fff',
    fontFamily: Fonts.Bold,
    fontSize: wp(2.5),
    textAlign: 'center',
    marginTop: hp(0.5),
  },
});

export default styles;
