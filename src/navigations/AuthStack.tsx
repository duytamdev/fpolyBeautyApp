import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  console.log('AuthStack');
  return (
          <Stack.Navigator>
              <Stack.Screen name={'Login'} component={LoginScreen} />
              <Stack.Screen name={'Register'} component={RegisterScreen} />
          </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default AuthStack;
