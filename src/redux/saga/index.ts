import { all, fork } from 'redux-saga/effects';
import watchAuthSaga from './authSaga';

export default function* rootSaga() {
  console.log('root');
  yield all([
    // ...
    fork(watchAuthSaga),
  ]);
}
