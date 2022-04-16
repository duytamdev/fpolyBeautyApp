import React from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';

interface Props {
  title?: string;
}
const ButtonGoogle = ({ title }:Props) => (
        <TouchableOpacity style={styles.container}>
            <Image source={require('../../../assets/images/google_logo.png')} style={styles.image}/>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
);
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(27,43,65,0.72)',
  },
  image: {
    width: 19,
    height: 19,
    marginRight: 20,
  },
  container: {
    marginTop: 28,
    marginBottom: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(28,52,84,0.26)',
  },
});
export default ButtonGoogle;
