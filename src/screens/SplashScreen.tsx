import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import RootNavigation from '../navigations';
import { replace } from '../navigations/rootNavigator';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(async () => {
      navigation.replace('Root');
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
        <View style={styles.container}>
            <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 32 }}>FPT Polytechnic</Text>
            <Text style={{ color: COLORS.white, fontSize: 16 }}>Vô vạn cảm xúc</Text>
            <StatusBar style="light" backgroundColor={COLORS.primary} />
        </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
export default SplashScreen;
