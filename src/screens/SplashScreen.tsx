import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CONSTANTS, { COLORS } from '../constants';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const isLogin = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(CONSTANTS.IS_LOGIN);
        return jsonValue != null ? JSON.parse(jsonValue) : false;
      } catch (e) {
        console.log(e);
      }
    };
    const timeout = setTimeout(async () => {
      const logged = await isLogin();
      await navigation.replace(logged ? 'BottomTabs' : 'Auth');
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
