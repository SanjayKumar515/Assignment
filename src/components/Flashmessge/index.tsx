import { showMessage } from 'react-native-flash-message';
import { Fonts } from '../../constant';

// Define a type for the options if you want to make it more customizable

// Function to show a success message
export const showSuccess = (message: string) => {
  showMessage({
    message,
    textStyle: {
      fontFamily: Fonts.Bold,
      fontSize: 10,
    },
    type: 'success',
    icon: 'success',
    duration: 2000, // Defaults to 3000ms if not provided
  });
};

// Function to show an error message
export const showError = (message: string) => {
  showMessage({
    message,
    textStyle: {
      fontFamily: Fonts.Bold,
      fontSize: 10,
    },
    type: 'danger',
    icon: 'danger',
    duration: 2000, // Defaults to 3000ms if not provided
  });
};

export const showMessages = (message: string) => {
  showMessage({
    message,
    textStyle: {
      fontFamily: Fonts.Bold,
      fontSize: 10,
    },
    type: 'info',
    icon: 'info',
    duration: 2000, // Defaults to 3000ms if not provided
  });
};
