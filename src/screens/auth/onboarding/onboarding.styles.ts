import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, Fonts } from '../../../constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8f2', // Peach tint background matching screenshot
  },
  container: {
    flex: 1,
    backgroundColor: '#fff8f2',
  },
  scrollContainer: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: hp(52), // Takes up top portion of the screen
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(4),
  },
  // Slide 1 - Meditating Woman
  blobContainer: {
    width: wp(82),
    height: wp(82),
    borderRadius: wp(41),
    borderTopLeftRadius: wp(35),
    borderBottomRightRadius: wp(38),
    borderBottomLeftRadius: wp(28),
    borderTopRightRadius: wp(32),
    backgroundColor: '#fbece0',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 4,
    borderColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#bd5807',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  blobImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  checkInBadge: {
    position: 'absolute',
    top: hp(2),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.8),
    borderRadius: 20,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  checkInText: {
    fontSize: wp(3),
    fontFamily: Fonts.Medium,
    color: '#333',
    marginLeft: wp(1),
  },
  calmCard: {
    position: 'absolute',
    right: wp(4),
    top: hp(10),
    width: wp(42),
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: wp(3),
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  calmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  calmRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leafIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fbece0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(1.5),
  },
  calmText: {
    fontSize: wp(3.2),
    fontFamily: Fonts.SemiBold,
    color: '#333',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#bd5807',
    borderRadius: 2,
  },
  heartBadge: {
    position: 'absolute',
    left: wp(14),
    bottom: hp(15),
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 12,
    borderWidth: 1.5,
    borderColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  waveOverlay: {
    position: 'absolute',
    bottom: hp(8),
    left: 0,
    right: 0,
    height: hp(12),
    zIndex: 5,
  },
  breathingTextContainer: {
    position: 'absolute',
    bottom: hp(3.5),
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  breathingText: {
    fontSize: wp(3.1),
    fontFamily: Fonts.Medium,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  breathingDots: {
    flexDirection: 'row',
    marginTop: hp(0.5),
  },
  breathingDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 2,
  },
  breathingDotActive: {
    backgroundColor: '#ffffff',
    width: 6,
  },

  // Slide 2 - Mindfulness Dashboard
  dashboardContainer: {
    width: wp(85),
    height: hp(45),
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: wp(5),
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
    ...Platform.select({
      ios: {
        shadowColor: '#bd5807',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  dashHeader: {
    alignItems: 'center',
    marginBottom: hp(1),
  },
  dashTitle: {
    fontSize: wp(4.5),
    fontFamily: Fonts.Bold,
    color: '#2a5a63',
    textAlign: 'center',
  },
  dashSubtitle: {
    fontSize: wp(3.1),
    fontFamily: Fonts.Regular,
    color: '#7f9397',
    marginTop: 4,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  moodItem: {
    width: wp(16),
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  moodIconCircle: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#f7f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.5),
    borderWidth: 1,
    borderColor: '#eee',
  },
  moodIconCircleActive: {
    backgroundColor: '#ffece0',
    borderColor: '#ff9d02',
  },
  moodEmoji: {
    fontSize: wp(5.5),
  },
  moodText: {
    fontSize: wp(2.6),
    fontFamily: Fonts.Medium,
    color: '#666',
  },
  streakCard: {
    backgroundColor: '#2c9eaf',
    borderRadius: 16,
    padding: wp(3.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakInfo: {
    marginLeft: wp(2),
  },
  streakTitle: {
    color: '#ffffff',
    fontSize: wp(3.2),
    fontFamily: Fonts.SemiBold,
  },
  streakSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: wp(2.6),
    fontFamily: Fonts.Regular,
  },
  streakBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 12,
  },
  streakCount: {
    color: '#ffffff',
    fontSize: wp(3.2),
    fontFamily: Fonts.Bold,
  },

  // Slide 3 - Connected Community
  benchContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: hp(12),
  },
  communityIcon: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  heartRadiantIcon: {
    left: wp(6),
    top: hp(22),
  },
  linkIcon: {
    right: wp(8),
    top: hp(24),
  },
  chatBadge: {
    right: wp(12),
    top: hp(7),
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: wp(1.5),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  chatDots: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#f0f5f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(1),
  },
  userCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#f7ebd3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectingSvg: {
    position: 'absolute',
    top: hp(24),
    left: wp(28),
    width: wp(45),
    height: hp(10),
    zIndex: 8,
  },

  // Bottom Sheet
  bottomSheet: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: wp(8),
    paddingTop: hp(4),
    paddingBottom: Platform.OS === 'ios' ? hp(4) : hp(2.5),
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -12 },
        shadowOpacity: 0.04,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  title: {
    fontSize: wp(6.8),
    fontFamily: Fonts.Bold,
    color: '#000000',
    textAlign: 'center',
    lineHeight: wp(8.5),
    marginBottom: hp(1.8),
  },
  subtext: {
    fontSize: wp(3.8),
    fontFamily: Fonts.Regular,
    color: '#7f7f7f',
    textAlign: 'center',
    lineHeight: wp(5.5),
    paddingHorizontal: wp(1),
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    marginBottom: hp(3.5),
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e6e6e6',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#7f7f7f',
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  button: {
    backgroundColor: '#bd5807', // Dark golden-brown/burnt-orange matching screenshot
    width: wp(80),
    height: hp(6.8),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#bd5807',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonText: {
    color: '#ffffff',
    fontSize: wp(4.2),
    fontFamily: Fonts.SemiBold,
  },
});
