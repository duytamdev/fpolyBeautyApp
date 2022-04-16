import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  console.log('RootNavigation');
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <AuthStack/>
              <BottomTabs/>
          </Stack.Navigator>
      </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default RootNavigation;
