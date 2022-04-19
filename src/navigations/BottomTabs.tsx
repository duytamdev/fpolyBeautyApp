import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CreatePinScreen from '../screens/CreatePinScreen';
import AccountScreen from '../screens/AccountScreen';
import { COLORS } from '../constants';

const Tab = createBottomTabNavigator();
const BottomTabs = () => (
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,

      }}>
          <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="home" size={size} color={color} />
            ),
          }} />
          <Tab.Screen name="CreatePin" component={CreatePinScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="plus" color={color} size={size} />
            ),
          }} />
          <Tab.Screen name="Account" component={AccountScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-alt" color={color} size={size} />
            ),
          }} />
      </Tab.Navigator>
);
export default BottomTabs;
