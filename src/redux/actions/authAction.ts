import TYPES from '../types';

export interface IAuthAction {
  type: string;
  payload: boolean;
}

const loginSaveState = (isLogged:boolean) => ({
  type: TYPES.AUTH_LOGIN,
  payload: isLogged,
});
const logoutSaveState = (isLogged:boolean) => ({
  type: TYPES.AUTH_LOGOUT,
  payload: isLogged,
});

export { loginSaveState, logoutSaveState };
