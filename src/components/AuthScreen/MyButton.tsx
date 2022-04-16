import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../constants';

interface Props {
    title: string;
    style?: any;
    onPress: () => void;
}
const MyButton = (props:Props) => {
  const {
    title, style, onPress, ...rest
  } = props;
  return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  title: {
    color: COLORS.white,
    fontSize: 16,
    paddingVertical: 17.5,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});
export default MyButton;
