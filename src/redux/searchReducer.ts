import { SEARCH_REQUEST, SEARCH_FAILURE, SEARCH_SUCCESS, CHANGE_SEARCH_FIELD } from './actions/actionTypes';
import { TSearchAction } from './actions';

export type TSearchStateItem = {
  id: string;
  name: string;
}

export type TSearchState = {
  loading: boolean;
  error: Error | string | null;
  search: string;
  items: Array<TSearchStateItem>;
}

const initialState : TSearchState = {
  loading: false,
  items: [],
  error: null,
  search: ''
};

export default function searchReducer(state : TSearchState = initialState, action: TSearchAction) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, items: [], loading: true, error: null };
    case SEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case SEARCH_SUCCESS:
      return { ...state, loading: false, error: null, items: action.payload.items };
    case CHANGE_SEARCH_FIELD: {
      const { search } = action.payload;
      const items = search && search.trim() !== '' ? state.items : [];
      return { ...state, items, search: action.payload.search };
    }
    default:
      return state;
  }
}