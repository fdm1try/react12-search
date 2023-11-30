import { spawn } from 'redux-saga/effects';
import { watchChangeSearchSaga, watchSearchSaga } from './searchSaga';

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSaga);
}