import { SearchState } from './search.state';
import * as SearchActions from './search.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export type Action = SearchActions.All;

export const initialState: SearchState = {
  items: [],
  loading: false,
  error: false,
  searchText: '',
  pageProps: {
    page: 1,
    per_page: 10
  },
  total_count: 0,
  selectedRepo: null
};

// selectors

const getSearchResultsState = createFeatureSelector<SearchState>('search');

export const getSearchResults = createSelector(
  getSearchResultsState,
  state => state.items
);

export const get = createSelector(
  getSearchResultsState,
  state => state.items
);

export const getTotalCount = createSelector(
  getSearchResultsState,
  state => state.total_count
);

export const getSearchText = createSelector(
  getSearchResultsState,
  state => state.searchText
);

export const getRepoPaging = createSelector(
  getSearchResultsState,
  state => state.pageProps
);

export const getLoading = createSelector(
  getSearchResultsState,
  state => state.loading
);

export const getSelectedRepo = createSelector(
  getSearchResultsState,
  state => state.selectedRepo
);

export function SearchReducer(state = initialState, action: Action): SearchState {
  switch (action.type) {
    case SearchActions.GET_SEARCH_RESULTS: {
      return { ...state, loading: true };
    }

    case SearchActions.GET_SEARCH_RESULTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    }

    case SearchActions.GET_SEARCH_RESULTS_ERROR: {
      return {
        ...state,
        error: true,
        loading: false
      };
    }

    case SearchActions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.payload
      };
    }

    case SearchActions.SET_REPO_PAGING: {
      return {
        ...state,
        pageProps: {...action.payload }
      }
    }

    case SearchActions.SET_SELECTED_REPOSITORY: {
      return {
        ...state,
        selectedRepo: action.payload
      }
    }

    default:
      return state;
  }
}
