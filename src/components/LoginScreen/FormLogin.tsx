import React from 'react';
import {
  Text, View, StyleSheet, Alert,
} from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import MyInput from '../AuthScreen/MyInput';
import { COLORS } from '../../constants';
import MyButton from '../AuthScreen/MyButton';
import { onLogin } from '../../services/UserService';
import { loginSaveState } from '../../redux/actions/authAction';

const loginYupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required!'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
});

const FormLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogin = async (values: FormikValues) => {
    try {
      const res = await onLogin({
        email: values.email,
        password: values.password,
      });
      if (res.error) {
        Alert.alert('Error', res.error);
      } else {
        // save state login
        dispatch(loginSaveState(true));
        navigation.navigate('BottomTabs');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  const handleGoToSignUp = () => {
    navigation.navigate('Register');
  };
  return (
        <Formik initialValues={{
          email: '',
          password: '',
        }}
                validationSchema={loginYupSchema}
                onSubmit={(values) => handleLogin(values)}
        >
            {({
              handleBlur, handleChange, handleSubmit, values, errors, isValid,
            }) => (
                <View style={styles.inputContainer}>
                    <View>
                        <MyInput value={values.email}
                                 onChangeText={handleChange('email')}
                                 onBlur={handleBlur('email')}
                                 label={'Email'}/>
                        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <MyInput value={values.password}
                                 isPassword={true}
                                 onChangeText={handleChange('password')}
                                 onBlur={handleBlur('password')}
                                 label={'Password'}/>
                        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                    </View>
                    <View style={styles.sectionPass}>
                        <Text>Remember me</Text>
                        <Text style={styles.textForgot}>Forgot password?</Text>
                    </View>
                    <MyButton disabled={!isValid} title={'Login'} onPress={handleSubmit}/>
                    <View style={styles.sectionRegister}>
                        <Text>Don't have an account? </Text>
                        <Text onPress={handleGoToSignUp} style={styles.textPrimary}>Sign Up</Text>
                    </View>
                </View>
            )}
        </Formik>
  );
};
const styles = StyleSheet.create({
  textPrimary: {
    color: COLORS.primary,
  },
  sectionRegister: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionPass: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textForgot: {
    fontWeight: '700',
    color: COLORS.black,
  },
  inputContainer: {
  },
  error: {
    fontSize: 12,
    color: COLORS.error,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default FormLogin;
