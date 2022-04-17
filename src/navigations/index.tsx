import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';
import DetailsPin from '../screens/DetailsPin';

const Stack = createNativeStackNavigator();
const RootNavigation = () => (
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
              <Stack.Screen name={'Auth'} component={AuthStack} />
              <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
              <Stack.Screen name={'DetailsPin'} component={DetailsPin} />
          </Stack.Navigator>
);
export default RootNavigation;
