import { combineReducers, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import searchReducer, { TSearchState } from '../searchReducer';
import saga from '../../sagas';

const reducer = combineReducers({ search: searchReducer });
const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
  reducer, devTools: true, enhancers: [
    compose(applyMiddleware(sagaMiddleWare)),
  ]
})

sagaMiddleWare.run(saga);
export default configureStore;

export type TRootState = {
  search: TSearchState
}