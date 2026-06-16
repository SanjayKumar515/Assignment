import { Platform } from 'react-native';

export const AppConfig = {
  appName: 'Wellness App',
  enableScanModalView: Platform.OS == 'ios',
  defaultTheme: 'Light',
  enableLogs: __DEV__ ? true : false,
  otpResendTimer: 30,
  enableTabLabel: true,
  isProd: true,
  apiTimeout: 30 * 1000,
};
