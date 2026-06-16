import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import { ReactNode } from 'react';
import { Colors, Icon } from '../../constant';
import TextView from '../TextView/textView';
import styles from './styles';

interface CustomTextInputProps {
  value: string;
  onChangeText: ( text: string ) => void;
  label?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  error?: string;
  touched?: boolean;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  maxLength?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  isSecure?: boolean;
  onSecureTextPress?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  leftIcon?: ImageSourcePropType | ReactNode;
  rightIcon?: ImageSourcePropType | ReactNode;
  leftIconStyle?: ImageStyle;
  rightIconStyle?: ImageStyle;
  matchValue?: string;
  showMatchStatus?: boolean;
  matchErrorText?: string;
  onSubmitEditing?: () => void;
}

// ✅ Forward ref to allow parent access to focus()
const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      value,
      onChangeText,
      label,
      placeholder,
      placeholderTextColor,
      error,
      touched,
      editable = true,
      keyboardType,
      returnKeyType,
      maxLength,
      style,
      inputStyle,
      labelStyle,
      isSecure = false,
      onSecureTextPress,
      multiline = false,
      numberOfLines = 1,
      borderRadius = 8,
      borderWidth = 1,
      borderColor = '#dbdbdb',
      leftIcon,
      rightIcon,
      leftIconStyle,
      rightIconStyle,
      matchValue,
      showMatchStatus = false,
      matchErrorText,
      onSubmitEditing,
    },
    ref
  ) => {
    const [ isFocused, setIsFocused ] = useState( false );

    const handleFocus = () => setIsFocused( true );
    const handleBlur = () => setIsFocused( false );

    const shouldValidateMatch =
      typeof matchValue === 'string' &&
      value?.length > 0 &&
      matchValue?.length > 0;
    const isMatch = shouldValidateMatch ? value === matchValue : true;
    const effectiveError = !isMatch
      ? matchErrorText || 'Passwords do not match'
      : error;

    const containerStyle: ViewStyle = {
      borderRadius,
      borderWidth,
      borderColor:
        effectiveError && touched
          ? Colors.ERROR[ 100 ]
          : isFocused
            ? Colors.PRIMARY[ 100 ]
            : borderColor,
      ...style,
    };

    return (
      <View style={ styles.container }>
        { label && (
          <TextView style={ [ styles.label, labelStyle ] }>{ label }</TextView>
        ) }
        <View
          style={ [
            styles.inputContainer,
            containerStyle,
            { opacity: editable ? 1 : 0.7 },
            {
              backgroundColor: editable
                ? Colors.PRIMARY[ 300 ] + '20'
                : '#e4e2e2',
            },
          ] }
        >
          { leftIcon && (
            React.isValidElement(leftIcon) ? (
              <View style={[styles.icon, leftIconStyle]}>{leftIcon}</View>
            ) : (
              <Image
                source={ leftIcon as ImageSourcePropType }
                style={ [ styles.icon, leftIconStyle ] }
                resizeMode="contain"
              />
            )
          ) }

          <TextInput
            ref={ ref }
            value={ value }
            onChangeText={ onChangeText }
            placeholder={ placeholder }
            placeholderTextColor={
              placeholderTextColor || Colors.PRIMARY[ 400 ]
            }
            style={ [
              styles.input,
              {
                color: editable ? Colors.PRIMARY[ 100 ] : Colors.PRIMARY[ 400 ],
                textAlignVertical: 'center',
              },
              inputStyle,
            ] }

            editable={ editable }
            keyboardType={ keyboardType }
            returnKeyType={ returnKeyType }
            maxLength={ maxLength }
            secureTextEntry={ isSecure }
            multiline={ multiline }
            numberOfLines={ numberOfLines }
            onFocus={ handleFocus }
            onBlur={ handleBlur }
            autoCapitalize="none"
            autoCorrect={ false }
            onSubmitEditing={ onSubmitEditing }
            submitBehavior="submit"
          />

          { showMatchStatus && shouldValidateMatch && (
            <Icon
              family="Feather"
              name={ isMatch ? 'check-circle' : 'x-circle' }
              size={ 20 }
              color={ isMatch ? Colors.SUCCESS[ 100 ] : Colors.ERROR[ 100 ] }
              style={ styles.statusIcon }
            />
          ) }

          { rightIcon && (
            React.isValidElement(rightIcon) ? (
              <View style={[styles.icon, rightIconStyle]}>{rightIcon}</View>
            ) : (
              <Image
                source={ rightIcon as ImageSourcePropType }
                style={ [ styles.icon, rightIconStyle ] }
                resizeMode="contain"
              />
            )
          ) }

          { onSecureTextPress && (
            <TouchableOpacity
              style={ styles.secureButton }
              onPress={ onSecureTextPress }
            >
              <Icon
                family="Feather"
                name={ isSecure ? 'eye-off' : 'eye' }
                size={ 20 }
                color={ Colors.PRIMARY[ 400 ] }
              />
            </TouchableOpacity>
          ) }
        </View>

        { effectiveError && touched && (
          <TextView style={ styles.error }>{ effectiveError }</TextView>
        ) }
      </View>
    );
  }
);

export default CustomTextInput;
