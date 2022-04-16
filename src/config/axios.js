import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../constants';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.7:3000/api',
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(CONSTANTS.TOKEN_KEY);
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  (err) => Promise.reject(err),
);
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err),
); // callback
export default axiosInstance;
