import { retry, takeLatest, put, debounce } from 'redux-saga/effects';
import { searchRequest, searchSuccess, searchFailure, TSearchAction } from '../redux/actions';
import { CHANGE_SEARCH_FIELD, SEARCH_REQUEST } from '../redux/actions/actionTypes';
import { TSearchStateItem } from '../redux/searchReducer';
import { search } from '../api';


const filterChangeSearchAction = ({type, payload}: TSearchAction) => 
  type === CHANGE_SEARCH_FIELD && payload.search?.trim() !== '';

function* handleDebounceChangeSearchSaga(action: TSearchAction) {
  const search = action.payload.search;
  if (!search) return;
  yield put(searchRequest(search))
}

function* handleSearchSaga(action: TSearchAction) {
  if (!action.payload.search) return;
  try {
    const retryCount = 3;
    const retryDelay = 1000;
    const items: Array<TSearchStateItem> = yield retry(retryCount, retryDelay, search, action.payload.search);
    yield put(searchSuccess(items));
  } catch (error) {
    if (!(error instanceof Error)) return;
    yield put(searchFailure(error));
  }
}

export function* watchChangeSearchSaga() {
  //TODO: найти способ устранения ошибки в типизации
  //@ts-expect-error Argument of type TSearchAction is not assignable to parameter of type 'TakeableChannel<unknown>
  yield debounce(400, filterChangeSearchAction, handleDebounceChangeSearchSaga);
}

export function* watchSearchSaga() {
  yield takeLatest(SEARCH_REQUEST, handleSearchSaga);
}