import React from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  ScrollView,
} from 'react-native';
import { Text } from 'exoflex';

import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';

type Props<T> = {
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  name: string;
  values: Array<T>;
  selectedValue?: T;
  isSelected?: (item: T) => boolean;
  onSelect: (item: T) => void;
  nameExtractor?: (item: T) => string;
};

let defaultNameExtractor = (item: unknown) => String(item);

export default function RichRadioGroup(props: Props<string>) {
  let {
    containerStyle,
    buttonStyle,
    buttonTextStyle,
    name,
    values,
    onSelect,
    selectedValue,
    isSelected,
    nameExtractor = defaultNameExtractor,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.categoryTitle}>{name}</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {values.map((item, index) => {
          let isItemSelected =
            typeof isSelected === 'function'
              ? isSelected(item)
              : item === selectedValue;
          let marginLeft = index === 0 ? 0 : 16;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.buttonContainer,
                isItemSelected && styles.activeButton,
                buttonStyle,
                { marginLeft },
              ]}
              onPress={() => onSelect(item)}
            >
              <Text style={[styles.text, buttonTextStyle]}>
                {nameExtractor(item)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    maxHeight: 100,
  },
  buttonContainer: {
    minWidth: 48,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    borderColor: COLORS.primaryColor,
  },
  text: {
    fontSize: FONT_SIZE.medium,
  },
  categoryTitle: {
    opacity: 0.6,
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
});