import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authActions } from '../reducers/authSlice';
import axiosInstance from '../../config/axios';
import CONSTANTS from '../../constants';

function* login(action) {
  try {
    const res = yield axiosInstance.post('/auth/login', action.payload);
    if (res.error === null) {
      yield put(authActions.loginSuccess(res.data));
      const decoded = jwtDecode<JwtPayload>(res.response);
      yield AsyncStorage.setItem(CONSTANTS.ID_USER, decoded.id.toString());
      yield AsyncStorage.setItem(CONSTANTS.USER_INFO, JSON.stringify(decoded));
      yield AsyncStorage.setItem(CONSTANTS.IS_LOGIN, JSON.stringify(true));
    } else {
      yield put(authActions.loginFailure());
    }
  } catch (e) {
    console.log('login saga error', e);
    yield put(authActions.loginFailure());
  }
}
function* logout() {
  yield AsyncStorage.removeItem(CONSTANTS.ID_USER);
  yield AsyncStorage.removeItem(CONSTANTS.USER_INFO);
}
export default function* watchAuthSaga() {
  let isLogin = false;
  yield AsyncStorage.getItem(CONSTANTS.IS_LOGIN, (err, value) => {
    isLogin = JSON.parse(value);
  });
  console.log(isLogin);
  if (isLogin) {
    yield put(authActions.loginSuccess());
  }

  yield takeLatest(authActions.login.toString(), login);
  yield takeLatest(authActions.logout.toString(), logout);
}
