import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootNavigation from './src/navigations';
import store from './src/redux/store';
import SplashScreen from './src/screens/SplashScreen';
import { navigationRef } from './src/navigations/rootNavigator';

export default function App() {
  return (
      <Provider store={store}>
          <SafeAreaView style={styles.container}>
              <NavigationContainer ref={navigationRef}>
                  <RootNavigation />
              </NavigationContainer>
              <StatusBar style="auto" />
          </SafeAreaView>
      </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
