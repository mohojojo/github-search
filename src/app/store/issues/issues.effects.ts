import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom} from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ApiQueryBuilder } from '@services/api-query-builder';
import { ApiCallService } from '@services/api-call.service';

import { Store } from '@ngrx/store';
import { IssuesState } from './issues.state';
import * as IssueActions from './issues.actions';
import * as fromIssues from '@store/issues/issues.reducer';
import { IPageProps } from '../../shared/models/search/models';


@Injectable()
export class IssuesEffects {

  constructor(
    private actions$: Actions,
    private api: ApiCallService,
    private store$: Store<IssuesState>
  ) { }

  @Effect()
  GetRepoIssues$: Observable<Action> = this.actions$
    .pipe(
      ofType<IssueActions.GetRepoIssues>(IssueActions.GET_REPO_ISSUES),
      withLatestFrom(
        this.store$.select(fromIssues.getIssuesPaging),
      ),
      mergeMap(([action, paging]: [IssueActions.GetRepoIssues, IPageProps]) => {
        return this.api.constructApiCall(
          new ApiQueryBuilder()
            .addName('issues')
            .addQuery({ q: `repo:${action.payload.full_name}+state:open`})
            .addPaging(paging)
            .build()
        )
        .pipe(
          map(data => {
            return new IssueActions.GetRepoIssuesSuccess(data);
          }),
          catchError(error => {
            return of(new IssueActions.GetRepoIssuesFailure());
          })
        );
      })
    );
}
