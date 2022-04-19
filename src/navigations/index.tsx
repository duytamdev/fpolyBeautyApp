import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';
import DetailsPin from '../screens/DetailsPin';
import SplashScreen from '../screens/SplashScreen';
import ProfileUserScreen from '../screens/ProfileUserScreen';
import { COLORS } from '../constants';

const Stack = createNativeStackNavigator();
const RootNavigation = () => (
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
            <Stack.Screen name={'Splash'} component={SplashScreen} />
            <Stack.Screen name={'Auth'} component={AuthStack} />
            <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
            <Stack.Screen name={'DetailsPin'} component={DetailsPin} />
            <Stack.Screen name={'ProfileUser'} component={ProfileUserScreen} />
        </Stack.Navigator>
);
export default RootNavigation;
