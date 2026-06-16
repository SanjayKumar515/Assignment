import {
  ActivityIndicator,
  TouchableOpacity,
  TextStyle,
  View,
  ViewStyle,
  Image,
  DimensionValue,
  Text,
} from 'react-native';
import styles from './styles';
import { FC } from 'react';
import { Colors } from '../../constant';
import _ from 'lodash';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface ButtonProps {
  onPress?: () => void;
  isLoading?: boolean;
  indicatorColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  title?: string | null;
  titleStyle?: TextStyle;
  buttonColor?: string;
  textColor?: string;
  icon?: any;
  showIcon?: boolean;
  showfileSize?: boolean;
  pdfFileSize?: string;
  gradientColors?: string[];
  buttonWidth?: DimensionValue;
}

const Button: FC<ButtonProps> = ({
  onPress,
  isLoading,
  indicatorColor = Colors.PRIMARY[300],
  disabled,
  style,
  title,
  titleStyle,
  buttonColor = Colors.PRIMARY[100],
  textColor = Colors.PRIMARY[300],
  icon,
  showIcon,
  buttonWidth = wp(80),
}) => {
  const {
    buttonView,
    indicatorStyle,
    touchableOpacityStyle,
    buttonText,
    iconStyle,
  } = styles;

  const handleClick = () => {
    try {
      if (onPress) {
        _.debounce(onPress, 300)();
      }
    } catch (error) {
      console.warn('handleClick', error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: disabled ? Colors.SECONDARY[200] : buttonColor,
          width: buttonWidth,
        },
        style,
      ]}
      onPress={() => handleClick()}
      disabled={isLoading === true ? true : disabled}
    >
      <View style={touchableOpacityStyle}>
        {isLoading === true ? (
          <View style={buttonView}>
            <View style={indicatorStyle}>
              <ActivityIndicator color={indicatorColor} />
            </View>
          </View>
        ) : (
          <View style={buttonView}>
            {showIcon && (
              <Image
                source={icon}
                style={[
                  iconStyle,
                  { tintColor: disabled ? Colors.PRIMARY[300] : textColor },
                ]}
              />
            )}
            <Text
              style={[
                buttonText,
                { color: disabled ? Colors.PRIMARY[300] : textColor },
                titleStyle,
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
