import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const HomeScreen = () => {
  console.log('HomeScreen');
  return (
        <View style={styles.container}>
            <Text>Hello world</Text>
        </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default HomeScreen;
