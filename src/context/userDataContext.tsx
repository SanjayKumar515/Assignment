import React, {
  FC,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { LocalStorage } from '../helpers/localstorage';
export interface UserData {
  isLoggedIn: string | null;
  setIsLoggedIn: ( value: boolean | any ) => void;
  userData: any;
  setUserData: ( data: any ) => void;
  profileDetails: any;
}

const UserDataContext = createContext<UserData>( {
  isLoggedIn: null,
  setIsLoggedIn: () => { },
  userData: null,
  setUserData: () => { },
  profileDetails: null,
} );
type Props = {
  children?: ReactNode;
};

const UserDataContextProvider: FC<Props> = ( { children } ) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState<string | null>( null );
  const [ userData, setUserData ] = useState<any>( '' );
  const [ profileDetails, setProfileDetails ] = useState<string | null>( null );

  useEffect( () => {
    setContextDataFromStorage();
  }, [] );

  const setContextDataFromStorage = async () => {
    let val = await LocalStorage.read( '@login' );
    let user = await LocalStorage.read( '@user' );
    let token = await LocalStorage.read( '@token' );

    let data = {
      user: user,
      token: token,
    };
    setUserData( data );
    setIsLoggedIn( val );
  };



  return (
    <UserDataContext.Provider
      value={ {
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        profileDetails,
      } }
    >
      { children }
    </UserDataContext.Provider>
  );
};

export { UserDataContextProvider, UserDataContext };
