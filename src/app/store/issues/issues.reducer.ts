import { IssuesState } from './issues.state';
import * as IssuesActions from './issues.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export type Action = IssuesActions.All;

const initialState: IssuesState = {
  items: [],
  loading: false,
  error: false,
  pageProps: {
    page: 1,
    per_page: 10
  },
  total_count: 0
};

// selectors

const getIssuesResultState = createFeatureSelector<IssuesState>('issues');

export const getIssueResults = createSelector(
  getIssuesResultState,
  state => state.items
);

export const getTotalCount = createSelector(
  getIssuesResultState,
  state => state.total_count
);

export const getIssuesPaging = createSelector(
  getIssuesResultState,
  state =>  state.pageProps
);

export const getLoading = createSelector(
  getIssuesResultState,
  state => state.loading
);

export function IssuesReducer(state = initialState, action: Action): IssuesState {
  switch (action.type) {
    case IssuesActions.GET_REPO_ISSUES: {
      return { ...state, loading: true };
    }

    case IssuesActions.GET_REPO_ISSUES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    }

    case IssuesActions.GET_REPO_ISSUES_ERROR: {
      return {
        ...state,
        error: true,
        loading: false
      };
    }

    case IssuesActions.SET_ISSUES_PAGING: {
      return {
        ...state,
        pageProps: {...action.payload }
      }
    }

    default:
      return state;
  }
}
