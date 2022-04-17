import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

interface Props {
  title?: string;
  description?: string;
}

const SectionInfo = ({ title, description }:Props) => (
        <View style={styles.container}>
            <Text numberOfLines={3} style={styles.title}>{title}</Text>
            <Text numberOfLines={3} style={styles.description}>{description}</Text>
        </View>
);
const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: COLORS.black,
    fontSize: 14,
  },
  container: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SectionInfo;
