import React, { FC } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Icon } from '../../constant';
import styles from './styles';

export interface CountryPickerModalProps {
  visible: boolean;
  countries: any[];
  onClose: () => void;
  onSelect: (country: any) => void;
}

export const CountryPickerModal: FC<CountryPickerModalProps> = ({
  visible,
  countries,
  onClose,
  onSelect,
}) => {
  if (!visible) return null;

  return (
    <View
      style={[
        styles.modalOverlay,
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          elevation: 9999,
        },
      ]}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Country Code</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon family="Feather" name="x" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={countries}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.countryItem}
              onPress={() => onSelect(item)}
            >
              {item.flag_url ? (
                <Image
                  source={{ uri: item.flag_url }}
                  style={styles.countryFlag}
                  resizeMode="contain"
                />
              ) : null}
              <Text style={styles.countryName}>{item.name}</Text>
              <Text style={styles.countryCodeText}>{item.phonecode}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
