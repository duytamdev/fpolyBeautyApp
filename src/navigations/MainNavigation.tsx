import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';
import DetailsPin from '../screens/DetailsPin';
import ProfileUserScreen from '../screens/ProfileUserScreen';

const Stack = createNativeStackNavigator();

const MainNavigation = () => (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
        <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
        <Stack.Screen name={'DetailsPin'} component={DetailsPin} />
        <Stack.Screen name={'ProfileUser'} component={ProfileUserScreen} />
    </Stack.Navigator>
);

export default MainNavigation;
