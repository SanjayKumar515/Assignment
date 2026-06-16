import { View, TouchableOpacity, Image } from 'react-native';
import { TextView } from '../../components';
import { Colors } from '../../constant';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { FC, useContext } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserData, UserDataContext } from '../../context/userDataContext';

interface HeaderProps {
  heading?: string;
  headerType?: string;
  headerOnBackPressed?: () => void;
  headerOnDrawerPress?: () => void; // Added prop for drawer
}

const Header: FC<HeaderProps> = ( {
  heading,
  headerType,
  headerOnBackPressed,
  headerOnDrawerPress,
} ) => {
  const navigation = useNavigation();
  const { userData } = useContext<UserData>( UserDataContext );
  const profilePic = `https://mlsuexamination.sumsraj.com/examimage/PORTAL_DATA/StuImg/`;

  return (
    <View>
      { headerType === 'INNER' ? (
        <View style={ styles.profileView }>
          <TouchableOpacity
            onPress={ () => headerOnBackPressed && headerOnBackPressed() }>
            <Ionicons
              name="arrow-back-outline"
              size={ 25 }
              color={ Colors.PRIMARY[ 100 ] }
            />
          </TouchableOpacity>
          <TextView style={ styles.dashboardText }>{ heading }</TextView>
          <TouchableOpacity
            onPress={ () => navigation.navigate( 'MyProfile' as never ) }>
            { !userData.uploadImage ? (
              <FontAwesome
                name="user-circle-o"
                size={ 50 }
                color={ Colors.PRIMARY[ 100 ] }
              />
            ) : (
              <View style={ styles.profilePictureView }>
                <Image
                  source={ {
                    uri:
                      profilePic + userData.uploadImage &&
                      profilePic + userData.uploadImage,
                  } }
                  style={ styles.userImage }
                />
              </View>
            ) }
          </TouchableOpacity>
        </View>
      ) : (
        <View style={ styles.profileView }>
          <TouchableOpacity
            onPress={ () => headerOnDrawerPress && headerOnDrawerPress() }>
            <Ionicons
              name="menu"
              size={ 30 }
              color={ Colors.PRIMARY[ 100 ] }
              style={ { marginRight: 10 } }
            />
          </TouchableOpacity>
          <TextView style={ styles.dashboardText }>{ heading }</TextView>
          <TouchableOpacity
            onPress={ () => navigation.navigate( 'MyProfile' as never ) }>
            { !userData.uploadImage ? (
              <FontAwesome
                name="user-circle-o"
                size={ 50 }
                color={ Colors.PRIMARY[ 100 ] }
              />
            ) : (
              <View style={ styles.profilePictureView }>
                <Image
                  source={ {
                    uri:
                      profilePic + userData.uploadImage &&
                      profilePic + userData.uploadImage,
                  } }
                  style={ styles.userImage }
                />
              </View>
            ) }
          </TouchableOpacity>
        </View>
      ) }
    </View>
  );
};

export default Header;
