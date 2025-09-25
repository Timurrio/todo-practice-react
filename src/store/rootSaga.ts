import { all, fork } from 'redux-saga/effects';
import todoSagas from './todoSagas';
import userSagas from './userSagas';

export default function* rootSaga() {
  yield all([fork(todoSagas), fork(userSagas)]);
}
