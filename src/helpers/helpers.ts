import { LocalStorage } from './localstorage';
import { PermissionsAndroid, Platform } from 'react-native';

//To Sigout of User
export const handleSignout = (setIsLoggedIn: (isLoggedIn: boolean) => void) => {
  setTimeout(() => {
    setIsLoggedIn(false);
    LocalStorage.save('@login', false);
    LocalStorage.flushQuestionKeys();
  }, 700);
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good Morning ☀️';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon 🌞';
  } else if (hour >= 17 && hour < 21) {
    return 'Good Evening 🌇';
  } else {
    return 'Good Night 🌙';
  }
};

export const formattedDate = (dob: any): string => {
  if (!dob) return '';
  const date = new Date(dob);
  if (isNaN(date.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const getCurrentTime = () => {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    minutes,
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}${ampm}`;
  return formattedTime;
};

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'We need your location to show local weather',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

export const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'LocalWeatherApp/1.0',
      },
    });
    const data = await res.json();

    if (data && data.address) {
      const { road, city, town, village, state, postcode, country } =
        data.address;

      return {
        road: road || '',
        city: city || town || village || '',
        state: state || '',
        postcode: postcode || '',
        country: country || '',
        display_name: data.display_name || '',
      };
    }

    return null;
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    return null;
  }
};

export const formatDropdown = (
  data = [],
  labelKey: string,
  valueKey: string,
) => {
  return data.map((item: any, index: number) => ({
    label: item?.[labelKey],
    value: item?.[valueKey],
    key: `${item?.[valueKey]}-${index}`,
  }));
};


