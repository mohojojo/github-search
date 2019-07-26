import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { SearchListComponent } from './search-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { SearchReducer } from '@app/store/search/search.reducer';
import { IssuesListComponent } from './components/issues-list/issues-list.component';

@NgModule({
  declarations: [SearchListComponent, IssuesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('search', SearchReducer)
  ]
})
export class SearchListModule { }
