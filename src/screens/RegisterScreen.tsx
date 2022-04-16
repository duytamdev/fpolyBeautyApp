import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/AuthScreen/Header';
import ButtonGoogle from '../components/AuthScreen/ButtonGoogle';
import VerticalLine from '../components/AuthScreen/VerticalLine';
import FormRegister from '../components/RegisterScreen/FormRegister';

const RegisterScreen = () => {
  console.log('k');
  return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Header style={styles.header} title={'Create an Account'} sub={'Sign up now to get started with an account.'}/>
            <ButtonGoogle title={'Sign up with Google'}/>
            <VerticalLine/>
            <FormRegister/>
        </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {
    marginTop: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default RegisterScreen;
