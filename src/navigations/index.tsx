import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();
const RootNavigation = () => (
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
              <Stack.Screen name={'Auth'} component={AuthStack} />
              <Stack.Screen name={'BottomTab'} component={BottomTabs} />
          </Stack.Navigator>
);
export default RootNavigation;
