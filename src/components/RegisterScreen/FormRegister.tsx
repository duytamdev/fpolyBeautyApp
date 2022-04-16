import React from 'react';
import {
  Text, View, StyleSheet, Alert,
} from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import MyInput from '../AuthScreen/MyInput';
import MyButton from '../AuthScreen/MyButton';
import { COLORS } from '../../constants';
import { onRegister } from '../../services/UserService';

const registerYupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email format').required('Required!'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const RegisterForm = () => {
  const handleRegister = async (values: FormikValues) => {
    try {
      const res = await onRegister({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      console.log(res);
      if (res.error) {
        Alert.alert('Register failed!', `${res.error}`);
      } else {
        Alert.alert('Register success!');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  console.log('RegisterForm');
  return (
      <Formik initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
              validationSchema={registerYupSchema}
              onSubmit={(values) => handleRegister(values)}
      >
          {({
            handleChange, handleSubmit, values, errors, isValid,
          }) => (
              <View style={styles.inputContainer}>
                  <View>
                      <MyInput value={values.name}
                               onChangeText={handleChange('name')}
                               label={'Name'}/>
                      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                  </View>
                  <View>
                      <MyInput value={values.email}
                               onChangeText={handleChange('email')}
                               label={'Email'}/>
                      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                  </View>
                  <View style={styles.inputContainer}>
                      <MyInput value={values.password}
                               isPassword={true}
                               onChangeText={handleChange('password')}
                               label={'Password'}/>
                      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                  </View>
                  <View style={styles.inputContainer}>
                      <MyInput value={values.confirmPassword}
                               isPassword={true}
                               onChangeText={handleChange('confirmPassword')}
                               label={'Confirm Password'}/>
                      {
                          errors.confirmPassword
                          && <Text style={styles.error}>{errors.confirmPassword}</Text>}
                  </View>
                  <View style={styles.sectionTerms}>
                      <Text>I have read and agree to the</Text>
                      <Text style={styles.textPrimary}>{' '}Terms of Service</Text>
                  </View>
                  <MyButton disabled={!isValid} title={'Get Started'} onPress={handleSubmit}/>

              </View>
          )}
      </Formik>
  );
};
const styles = StyleSheet.create({
  textPrimary: {
    color: COLORS.primary,
  },
  sectionTerms: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  inputContainer: {
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    fontSize: 12,
    color: COLORS.error,
  },
});
export default RegisterForm;
