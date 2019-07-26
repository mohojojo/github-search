import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom} from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ApiQueryBuilder } from '@services/api-query-builder';
import { ApiCallService } from '@services/api-call.service';

import { Store } from '@ngrx/store';
import { SearchState } from './search.state';
import * as SearchActions from './search.actions';
import * as fromSearch from '@store/search/search.reducer';
import { IPageProps } from '../../shared/models/search/models';


@Injectable()
export class SearchEffects {

  constructor(
    private actions$: Actions,
    private api: ApiCallService,
    private store$: Store<SearchState>
  ) { }

  @Effect()
  GetSearchResults$: Observable<Action> = this.actions$
    .pipe(
      ofType<SearchActions.GetSearchResults>(SearchActions.GET_SEARCH_RESULTS),
      withLatestFrom(
        this.store$.select(fromSearch.getSearchText),
        this.store$.select(fromSearch.getRepoPaging),
      ),
      mergeMap(([action, text, paging]: [SearchActions.GetSearchResults, string, IPageProps]) => {
        return this.api.constructApiCall(
          new ApiQueryBuilder()
            .addName('search')
            .addQuery({ q: text })
            .addPaging(paging)
            .build()
        )
        .pipe(
          map(data => {
            return new SearchActions.GetSearchResultsSuccess(data);
          }),
          catchError(error => {
            return of(new SearchActions.GetSearchResultsError());
          })
        );
      })
    );
}
