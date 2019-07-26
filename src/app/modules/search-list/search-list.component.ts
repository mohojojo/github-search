import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SearchActions from '@store/search/search.actions';

import { State } from '@store/search/search.state';
import * as fromSearch from '@store/search/search.reducer';
import { IPageProps, Repository, IPaging } from '@app/shared/models/search/models';
import { MatDialog } from '@angular/material';
import { IssuesListComponent } from './components/issues-list/issues-list.component';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy, IPaging<Repository> {
  public dataSource: Observable<Repository[]> = null;
  public items: Repository[] = null;
  private totalCountSubscribe: any;
  private searchTextSubscribe: any;
  private pagingSubscribe: any;
  private loadingSubscribe: any;
  public total_count = 0;
  private searchText: string;
  public isLoading = true;
  public pageProps: IPageProps = { page: 0, per_page: 10 };

  public displayedColumns: string[] = [
    'name', 'stargazers_count', 'forks_count', 'description', 'open_issues_count'
  ];

  constructor(private store: Store<State>, public dialog: MatDialog) { }

  ngOnInit() {
    if (!this.dataSource) {
      this.dataSource = new BehaviorSubject([]);
    }

    this.dataSource = this.store.select(fromSearch.getSearchResults);
    this.totalCountSubscribe = this.store.select(fromSearch.getTotalCount).subscribe(totalCount => this.total_count = totalCount);
    this.pagingSubscribe = this.store.select(fromSearch.getRepoPaging).subscribe(paging => this.pageProps = paging);
    this.loadingSubscribe = this.store.select(fromSearch.getLoading).subscribe(loading => this.isLoading = loading);

    this.searchTextSubscribe = this.store.select(fromSearch.getSearchText).subscribe(text => {
      this.searchText = text;

      this.store.dispatch(
        new SearchActions.SetSearchText(text)
      );

      this.store.dispatch(
        new SearchActions.SetRepoPaging({ page: 0, per_page: this.pageProps.per_page })
      );

      this.store.dispatch(
        new SearchActions.GetSearchResults()
      );
    });
  }

  ngOnDestroy() {
    this.totalCountSubscribe.unsubscribe();
    this.searchTextSubscribe.unsubscribe();
    this.pagingSubscribe.unsubscribe();
    this.loadingSubscribe.unsubscribe();
  }

  pagingChanged(event) {
    this.store.dispatch(
        new SearchActions.SetRepoPaging({
          ...this.pageProps,
          page: event.pageIndex,
          per_page: event.pageSize
        })
      );

    this.store.dispatch(
      new SearchActions.GetSearchResults()
    );
  }

  onIssueCountClicked(item) {
    this.openDialog(item);
  }

  openDialog(item): void {
    this.store.dispatch(
      new SearchActions.SetSelectedRepository(item)
    );

    const dialogRef = this.dialog.open(IssuesListComponent, {
      width: '600px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getButtonSeverity(count) {
    if (count > 25) {
      return 'warn';
    } else if (count > 10) {
      return 'accent';
    } else {
      return 'primary';
    }
  }
}
