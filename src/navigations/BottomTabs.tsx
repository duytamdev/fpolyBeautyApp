import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CreatePinScreen from '../screens/CreatePinScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  console.log('BottomTabs');
  return (
      <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="CreatePin" component={CreatePinScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default BottomTabs;
