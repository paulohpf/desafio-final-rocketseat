import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { studentId } = payload;

    const response = yield call(api.post, '/sessions/students', {
      id: studentId,
    });

    yield put(signInSuccess(response.data.id));

    // history.push('/students');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Ocorreu um erro na tentativa de autenticação'
    );
    yield put(signFailure());
  }
}

// export function setToken({ payload }) {
//   if (!payload) return;

//   const { token } = payload.auth;

//   if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
// }

export function signOut() {
  // history.push('/');
}

export default all([
  // takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
