import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const VerticalLine = () => (
        <View style={styles.container}>
            <View style={styles.line}/>
            <Text style={styles.text}>OR</Text>
            <View style={styles.line}/>
        </View>
);
const styles = StyleSheet.create({
  text: {
    marginHorizontal: 17,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: 'rgba(28,52,84,0.26)',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default VerticalLine;
