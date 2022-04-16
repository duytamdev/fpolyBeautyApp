import axiosInstance from '../config/axios';

interface UserRegister {
  email: string;
  password: string;
  name?: string;
}
interface Response{
  error: string;
  status: number;
  response: string;
}
const onRegister = async ({ email, password, name }:UserRegister):Promise<Response> => axiosInstance.post('/auth/register', { email, password, name });
const onLogin = async ({ email, password }:UserRegister) :Promise<Response> => axiosInstance.post('/auth/login', { email, password });
export { onRegister, onLogin };
