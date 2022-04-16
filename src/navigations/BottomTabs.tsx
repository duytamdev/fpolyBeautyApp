import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CreatePinScreen from '../screens/CreatePinScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();
const BottomTabs = () => (
      <Tab.Navigator screenOptions={{
        headerShown: false,
      }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="CreatePin" component={CreatePinScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
);
export default BottomTabs;
