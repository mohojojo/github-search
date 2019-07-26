import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LandingComponent } from './landing.component';
import { SearchBarComponent } from '@app/shared/components/search-bar/search-bar.component';
import { SearchListComponent } from '../search-list/search-list.component';
import { IssuesListComponent } from '../search-list/components/issues-list/issues-list.component';

@NgModule({
  declarations: [LandingComponent, SearchBarComponent, SearchListComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class LandingModule { }
