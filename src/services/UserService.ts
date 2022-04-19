import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../config/axios';
import CONSTANTS from '../constants';
import { PropsUser } from '../screens/ProfileUserScreen';

interface UserRegister {
  email: string;
  password: string;
  name?: string;
}
interface Response{
  error: string|null;
  status: number;
  response: string|null;
}
interface JwtPayload{
  id: string;
  name: string;
  avatarUrl: string;
  exp?: number;
  iat?: string;
}
const onRegister = async ({ email, password, name }:UserRegister):Promise<Response> => axiosInstance.post('/auth/register', { email, password, name });
const onLogin = async ({ email, password }:UserRegister) :Promise<Response> => {
  const res = await axiosInstance.post('/auth/login', { email, password });

  // save id user
  if (!res.error) {
    const decoded = jwtDecode<JwtPayload>(res.response);
    await AsyncStorage.setItem(CONSTANTS.ID_USER, decoded.id);
    await AsyncStorage.setItem(CONSTANTS.USER_INFO, JSON.stringify(decoded));
  }
  return res;
};
const onUpdateInfo = async (data:any) => {
  const res = await axiosInstance.put(`/update-user-info/${data.id}`, data);
  // get value in AsyncStorage
  try {
    const value = await AsyncStorage.getItem(CONSTANTS.USER_INFO);
    let newValue;
    if (value !== null) {
      // update value in AsyncStorage
      newValue = { ...JSON.parse(value), name: data.name, avatarUrl: data.avatarUrl };
      await AsyncStorage.setItem(CONSTANTS.USER_INFO, JSON.stringify(newValue));
    }
  } catch (error) {
    console.log(error);
  }
  // save AsyncStorage
  return res;
};
export { onRegister, onLogin, onUpdateInfo };
