import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import MainNavigation from './MainNavigation';
import SplashScreen from '../screens/SplashScreen';
import { selectIsLogged } from '../redux/reducers/authSlice';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const isLoggined = useSelector(selectIsLogged);

  return (
    isLoggined ? <MainNavigation /> : <AuthStack />

  );
};

export const SplashRootNavigation = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false,
  }} >
      <Stack.Screen name={'Slash'} component={SplashScreen} />
    <Stack.Screen name="Root" component={RootNavigation} />
  </Stack.Navigator>
);
export default RootNavigation;
