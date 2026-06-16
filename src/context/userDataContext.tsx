import React, {
  FC,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { LocalStorage } from '../helpers/localstorage';
import { UserService } from '../service';
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


  // 🔥 AUTO FETCH PROFILE PHOTO WHEN userData CHANGES
  useEffect( () => {
    if ( !userData ) return;

    const getProfileData = async () => {
      try {
        const payload = {
          StoredProcedureName: 'DocRequest_GetPhotoName',
          Parameters: {
            pk_stuid: userData?.pk_stuid || userData?.user?.pk_stuid,
          },
        };

        const response = await UserService.commonApiEndpoint(
          JSON.stringify( payload )
        );
        setProfileDetails( response.data ?? null );
      } catch ( error ) {
        console.log( 'Error in getting profile data:', error );
      }
    };

    getProfileData();
  }, [ userData ] );


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
