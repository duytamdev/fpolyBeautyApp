import React from 'react';
import {
  Text, View, StyleSheet, Alert,
} from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ProgressDialog from 'react-native-progress-dialog';
import MyInput from '../AuthScreen/MyInput';
import { COLORS } from '../../constants';
import MyButton from '../AuthScreen/MyButton';
import { authActions, selectIsLogged, selectLogging } from '../../redux/reducers/authSlice';

const loginYupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required!'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
});

const FormLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLogged);
  const islogging = useSelector(selectLogging);

  const handleLogin = async (values: FormikValues) => {
    try {
      dispatch(authActions.login({
        email: values.email,
        password: values.password,
      }));
      if (loggedIn === false) {
        Alert.alert('Login failed', 'Please check your email and password');
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
                  <ProgressDialog loaderColor={COLORS.primary} label={'Đang đăng nhập...'} visible={islogging} />
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
