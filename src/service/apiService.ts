import axios from 'axios';
const STAGING_API_URL = 'https://testlink4.pillersofttechnologies.com/api/';

// https://sspapi.rpcau.ac.in/api/PortalLogin/GetOrPostDataToStoredProcedure

export const API_URL = STAGING_API_URL;
let APIKit = axios.create({
  baseURL: STAGING_API_URL,
  timeout: 30000,
});

//!Axios Intercepture For Handle Missing Authentication
export const SetAPIResponseInterceptors = ({ On401Error = () => {} }) => {
  APIKit.interceptors.response.use(
    response => {
      //Handle Missing Authentication Error
      if (response.status === 401 && On401Error) {
        On401Error();
      }
      return response;
    },
    error => {
      return error;
    },
  );
};

export const UserService = {
  loginUser: async (payload: any) => {
    const apiHeaders = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    return APIKit.post(
      'auth/login',
      payload,
      apiHeaders,
    );
  },
  registerUser: async (payload: any) => {
    return APIKit.post('auth/register', payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  },
  registerUserWithForm: async (payload: any) => {
    return APIKit.post('auth/register', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
  },
  getProfile: async (token: string) => {
    return APIKit.get('auth/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
  refreshToken: async (token: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch("https://testlink4.pillersofttechnologies.com/api/auth/refresh", requestOptions);
      const result = await response.json();
      return { status: response.status, data: result };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  },
  logoutUser: async (token: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch("https://testlink4.pillersofttechnologies.com/api/auth/logout", requestOptions);
      const result = await response.text();
      console.log(result);
      return { status: response.status, data: result };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  },
};

export const getCountryCode = {
  getCountries: async () => {
    const apiHeaders = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    return APIKit.get('countries', apiHeaders);
  },
};
