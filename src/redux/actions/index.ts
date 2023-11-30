import { TSearchStateItem } from '../searchReducer';
import { SEARCH_REQUEST, SEARCH_FAILURE, SEARCH_SUCCESS, CHANGE_SEARCH_FIELD } from './actionTypes';

export type TSearchActionPayload = {
  search?: string;
  items?: Array<string>;
  error?: string | Error;
}

export type TSearchAction = {
  type: string;
  payload: TSearchActionPayload;
}

export const searchRequest = (search: string) => ({
  type: SEARCH_REQUEST, payload: { search }
});

export const searchFailure = (error: string | Error) => ({
  type: SEARCH_FAILURE, payload: { error }
});

export const searchSuccess = (items: Array<TSearchStateItem>) => ({
  type: SEARCH_SUCCESS, payload: { items }
});

export const changeSearchField = (search: string) => ({
  type: CHANGE_SEARCH_FIELD, payload: { search }
});