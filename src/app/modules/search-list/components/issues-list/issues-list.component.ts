import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';
import { IIssue, IPaging, Repository, IPageProps } from '@app/shared/models/search/models';
import * as fromIssues from '@store/issues/issues.reducer';
import * as fromSearch from '@store/search/search.reducer';
import * as IssuesActions from '@store/issues/issues.actions';
import { Store } from '@ngrx/store';
import { State } from '@store/search/search.state';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit, IPaging<IIssue> {
  public dataSource: Observable<IIssue[]> = null;
  public items: IIssue[];
  private loadingSubscribe: any;
  private selectedRepoSubscribe: any;
  private pagingSubscribe: any;
  private totalCountSubscribe: any;
  public isLoading: boolean = false;
  private selectedRepo: Repository = null;
  public total_count: number = 0;
  public pageProps: IPageProps = { page: 0, per_page: 10 }
  public displayedColumns: string[] = [
    'number', 'title'
  ];

  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<IssuesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.dataSource = this.store.select(fromIssues.getIssueResults);
    this.totalCountSubscribe = this.store.select(fromIssues.getTotalCount).subscribe(totalCount => this.total_count = totalCount);
    this.pagingSubscribe = this.store.select(fromIssues.getIssuesPaging).subscribe(paging => this.pageProps = paging);
    this.loadingSubscribe = this.store.select(fromIssues.getLoading).subscribe(loading => this.isLoading = loading);

    this.selectedRepoSubscribe = this.store.select(fromSearch.getSelectedRepo).subscribe(repo => {
      this.selectedRepo = repo;
      this.store.dispatch(
        new IssuesActions.SetIssuesPaging({
          page: 0,
          per_page: this.pageProps.per_page
        })
      );
      this.store.dispatch(
        new IssuesActions.GetRepoIssues(repo)
      );
    });
  }

  pagingChanged(event) {
    this.store.dispatch(
        new IssuesActions.SetIssuesPaging({
          ...this.pageProps,
          page: event.pageIndex,
          per_page: event.pageSize
        })
      );

      this.store.dispatch(
        new IssuesActions.GetRepoIssues(this.selectedRepo)
      );
  }

  ngOnDestroy() {
    this.loadingSubscribe.unsubscribe();
    this.selectedRepoSubscribe.unsubscribe();
    this.pagingSubscribe.unsubscribe();
    this.totalCountSubscribe.unsubscribe();
  }
}
