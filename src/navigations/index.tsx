import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';
import DetailsPin from '../screens/DetailsPin';
import CONSTANTS from '../constants';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();
const RootNavigation = () => (
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
            <Stack.Screen name={'Splash'} component={SplashScreen} />
            <Stack.Screen name={'Auth'} component={AuthStack} />
            <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
            <Stack.Screen name={'DetailsPin'} component={DetailsPin} />

        </Stack.Navigator>
);
export default RootNavigation;
