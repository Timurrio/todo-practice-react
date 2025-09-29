// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
// import * as api from '../api/userApi';
// import {
//   initializeAuthRequest,
//   initializeAuthFailure,
//   initializeAuthSuccess,
// } from './userSlice';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import type { User } from '../types/User';

// function* initializeAuthSaga() {
//   try {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       const checkSavedUser: User = yield call(api.check, JSON.parse(savedUser));
//       yield put(initializeAuthSuccess(checkSavedUser));
//     } else {
//       yield put(initializeAuthSuccess(null));
//     }
//   } catch (err: any) {
//     yield put(initializeAuthFailure(err.message));
//   }
// }

// export default function* userSagas() {
//   yield takeLatest(initializeAuthRequest.type, initializeAuthSaga);
// }

import { call, put, takeLatest } from 'redux-saga/effects';
import { jwtDecode } from 'jwt-decode';
import * as api from '../../api/userApi';
import {
  initializeAuthRequest,
  initializeAuthSuccess,
  initializeAuthFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} from './userSlice';
import type { User } from '../../types/User';

interface DecodedToken {
  id: number;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

function decodeToken(token: string): User {
  const decoded: DecodedToken = jwtDecode(token);
  return {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
  };
}

function* initializeAuthSaga() {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const { token: refreshedToken }: { token: string } = yield call(
        api.check,
        token
      );
      localStorage.setItem('token', refreshedToken);
      const user = decodeToken(refreshedToken);
      yield put(initializeAuthSuccess({ user, token: refreshedToken }));
    } else {
      yield put(initializeAuthSuccess({ user: null, token: null }));
    }
  } catch (err: any) {
    yield put(initializeAuthFailure(err?.message || 'Unexpected error'));
  }
}

function* registerSaga(action: ReturnType<typeof registerRequest>) {
  try {
    const { email, password, name } = action.payload;
    const { token }: { token: string } = yield call(api.register, {
      email,
      password,
      name,
    });
    localStorage.setItem('token', token);
    const user = decodeToken(token);
    yield put(registerSuccess({ user, token }));
  } catch (err: any) {
    yield put(registerFailure(err?.message || 'Unexpected error'));
  }
}

function* loginSaga(action: ReturnType<typeof loginRequest>) {
  try {
    const { email, password } = action.payload;
    const { token }: { token: string } = yield call(api.login, {
      email,
      password,
    });
    localStorage.setItem('token', token);
    const user = decodeToken(token);
    yield put(loginSuccess({ user, token }));
  } catch (err: any) {
    yield put(loginFailure(err?.message || 'Unexpected error'));
  }
}

export default function* userSagas() {
  yield takeLatest(initializeAuthRequest.type, initializeAuthSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(loginRequest.type, loginSaga);
}
