import { SearchState } from './search.state';

import { Action } from '@ngrx/store';
import { Repository, IPageProps } from '@app/shared/models/search/models';

export const GET_SEARCH_RESULTS = '[Search] GET_SEARCH_RESULTS';
export const GET_SEARCH_RESULTS_SUCCESS = '[Search] GET_SEARCH_RESULTS_SUCCESS';
export const GET_SEARCH_RESULTS_ERROR = '[Search] GET_SEARCH_RESULTS_ERROR';
export const SET_REPO_PAGING = '[Search] SET_REPO_PAGING';
export const SET_SEARCH_TEXT = '[Search] SET_SEARCH_TEXT';
export const SET_SELECTED_REPOSITORY = '[Search] SET_SELECTED_REPOSITORY';

export class GetSearchResults implements Action {
  readonly type = GET_SEARCH_RESULTS;
  constructor(public payload: any = null) { }
}

export class GetSearchResultsSuccess implements Action {
  readonly type = GET_SEARCH_RESULTS_SUCCESS;
  constructor(public payload: any) { }
}

export class GetSearchResultsError implements Action {
  readonly type = GET_SEARCH_RESULTS_ERROR;
}

export class SetRepoPaging implements Action {
  readonly type = SET_REPO_PAGING;
  constructor(public payload: IPageProps) { }
}

export class SetSearchText implements Action {
  readonly type = SET_SEARCH_TEXT;
  constructor(public payload: string) { }
}

export class SetSelectedRepository implements Action {
  readonly type = SET_SELECTED_REPOSITORY;
  constructor(public payload: Repository) { }
}

export type All = GetSearchResults | GetSearchResultsSuccess
  | GetSearchResultsError | SetRepoPaging | SetSearchText
  | SetSelectedRepository;
