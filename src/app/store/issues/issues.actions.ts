import { IssuesState } from './issues.state';

import { Action } from '@ngrx/store';
import { Repository, IPageProps } from '@app/shared/models/search/models';

export const SET_ISSUES_PAGING = '[Search] SET_ISSUES_PAGING';
export const GET_REPO_ISSUES = '[Search] GET_REPO_ISSUES';
export const GET_REPO_ISSUES_SUCCESS = '[Search] GET_REPO_ISSUES_SUCCESS';
export const GET_REPO_ISSUES_ERROR = '[Search] GET_REPO_ISSUES_ERROR';

export class SetIssuesPaging implements Action {
  readonly type = SET_ISSUES_PAGING;
  constructor(public payload: IPageProps) { }
}

export class GetRepoIssues implements Action {
  readonly type = GET_REPO_ISSUES;
  constructor(public payload: Repository) { }
}

export class GetRepoIssuesSuccess implements Action {
  readonly type = GET_REPO_ISSUES_SUCCESS;
  constructor(public payload: any) { }
}

export class GetRepoIssuesFailure implements Action {
  readonly type = GET_REPO_ISSUES_ERROR;
}

export type All =
  SetIssuesPaging | GetRepoIssues | GetRepoIssuesFailure | GetRepoIssuesSuccess;
