import React from 'react';
import {
  Text, View, StyleSheet, ScrollView,
} from 'react-native';
import Header from '../components/AuthScreen/Header';
import ButtonGoogle from '../components/AuthScreen/ButtonGoogle';
import VerticalLine from '../components/AuthScreen/VerticalLine';
import MyInput from '../components/AuthScreen/MyInput';
import MyButton from '../components/AuthScreen/MyButton';
import FormLogin from '../components/LoginScreen/FormLogin';

const LoginScreen = () => (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Header title={'Log in to your Account'} sub={'Welcome back, please enter your details.'}/>
            <ButtonGoogle title={'Continue with Google'}/>
            <VerticalLine/>
            <FormLogin/>
        </ScrollView>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});
export default LoginScreen;
