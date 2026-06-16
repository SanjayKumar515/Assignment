import { StyleSheet } from 'react-native';
import Fonts from './fonts';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


const Typography = StyleSheet.create( {
    GlobalHeaderLight32: {
        fontFamily: Fonts.Black,
        fontSize: wp( 8 ),
        lineHeight: 48,
    },
    H1Semibold32: {
        fontFamily: Fonts.SemiBold,
        fontSize: wp( 8 ),
        lineHeight: 48,
    },
    BodyMedium13: {
        fontFamily: Fonts.Medium,
        fontSize: wp( 3 ),
        lineHeight: 21,
    },
    H2Semibold28: {
        fontFamily: Fonts.SemiBold,
        fontSize: wp( 7 ),
        lineHeight: 42,
    },
    H3Semibold24: {
        fontFamily: Fonts.SemiBold,
        fontSize: wp( 6 ),
        lineHeight: 36,
    },
    H4Semibold20: {
        fontFamily: Fonts.Bold,
        fontSize: wp( 5 ),
        lineHeight: 24,
    },
    H4Semibold19: {
        fontFamily: Fonts.Bold,
        fontSize: wp( 4 ),
        lineHeight: 22,
    },
    H5Medium16: {
        fontFamily: Fonts.Bold,
        fontSize: wp( 4 ),
        lineHeight: 20,
    },
    H5Medium15: {
        fontFamily: Fonts.Medium,
        fontSize: wp( 3 ),
        lineHeight: 17,
    },
    H5Medium17: {
        fontFamily: Fonts.Medium,
        fontSize: wp( 3 ),
        lineHeight: 20,
    },
    H7Semibold14: {
        fontFamily: Fonts.SemiBold,
        fontSize: wp( 3.9 ),
        lineHeight: 20,
    },
    H6Semibold13: {
        fontFamily: Fonts.SemiBold,
        fontSize: wp( 3 ),
        lineHeight: 20,
    },
    BodyRegular14: {
        fontFamily: Fonts.Regular,
        fontSize: wp( 3.3 ),
        lineHeight: 21,
    },
    BodyMedium14: {
        fontFamily: Fonts.Medium,
        fontSize: wp( 3.3 ),
        lineHeight: 21,
    },
    BodyBold14: {
        fontFamily: Fonts.Bold,
        fontSize: wp( 3.3 ),
        lineHeight: 21,
    },
    BodyBold13: {
        fontFamily: Fonts.Bold,
        fontSize: wp( 3 ),
        lineHeight: 21,
    },
    BodyBold12: {
        fontFamily: Fonts.Bold,
        fontSize: wp( 2.8 ),
        lineHeight: 18,
    },
    BodyMedium1: {
        fontFamily: Fonts.Medium,
        fontSize: wp( 2.6 ),
        lineHeight: 22,
    },
    BodyRegularItalic13: {
        fontFamily: Fonts.Italic,
        fontSize: wp( 3.5 ),
        lineHeight: 21,
    },
    BodyRegular13: {
        fontFamily: Fonts.Regular,
        fontSize: wp( 3 ),
        lineHeight: 21,
    },
    BodyRegular12: {
        fontFamily: Fonts.Regular,
        fontSize: wp( 2.8 ),
        lineHeight: 21,
    },
    BodyMedium11: {
        fontFamily: Fonts.Medium,
        fontSize: wp( 2.5 ),
        lineHeight: 21,
    },
    Footnote10: {
        fontFamily: Fonts.Regular,
        fontSize: wp( 2.25 ),
        lineHeight: 15,
    },
    Footnote11: {
        fontFamily: Fonts.Regular,
        fontSize: wp( 2.5 ),
        lineHeight: 12,
    },


} )

export default Typography