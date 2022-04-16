import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import ButtonGoogle from './ButtonGoogle';

interface ParamsHeaderProps {
  title: string;
  sub: string;
}
const Header = ({ title, sub }:ParamsHeaderProps) => (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sub}>{sub}</Text>
        </View>
);
const styles = StyleSheet.create({
  sub: {
    color: '#1A293D',
    fontSize: 14,
  },
  title: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: '600',
  },
  container: {
    marginTop: 160,
    alignItems: 'center',
  },
});
export default Header;
