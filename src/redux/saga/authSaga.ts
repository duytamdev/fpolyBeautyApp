import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authActions } from '../reducers/authSlice';
import axiosInstance from '../../config/axios';
import CONSTANTS from '../../constants';

function* login(action) {
  console.log('login saga', action.payload);
  try {
    const res = yield axiosInstance.post('/auth/login', action.payload);
    if (res.error === null) {
      yield put(authActions.loginSuccess(res.data));
      const decoded = jwtDecode<JwtPayload>(res.response);
      console.log(decoded);
      yield AsyncStorage.setItem(CONSTANTS.ID_USER, decoded.id.toString());
      yield AsyncStorage.setItem(CONSTANTS.USER_INFO, JSON.stringify(decoded));
    } else {
      yield put(authActions.loginFailure());
    }
  } catch (e) {
    console.log('login saga error', e);
    yield put(authActions.loginFailure());
  }
}
function* logout() {
  console.log('logout saga');
  yield put(authActions.logout());
  yield AsyncStorage.removeItem(CONSTANTS.ID_USER);
}
export default function* watchAuthSaga() {
  yield takeLatest(authActions.login.toString(), login);
  yield takeLatest(authActions.logout.toString(), logout);
}
