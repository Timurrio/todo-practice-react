import { all, fork } from 'redux-saga/effects';
import todoSagas from './todoSlice/todoSagas';
import userSagas from './userSlice/userSagas';

export default function* rootSaga() {
  yield all([fork(todoSagas), fork(userSagas)]);
}
