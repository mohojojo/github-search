import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SearchListComponent } from './search-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { SearchState } from '@app/store/search/search.state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchReducer } from '@app/store/search/search.reducer';
import * as SearchActions from '@app/store/search/search.actions';

import SearchStateMock from '@app/mock/SearchStateMock';

export type Action = SearchActions.All;

describe('SearchListComponent', () => {
  let component: SearchListComponent;
  let fixture: ComponentFixture<SearchListComponent>;

  let store: MockStore<SearchState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchListComponent ],
      imports: [ SharedModule, NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('search', SearchReducer)]
      }).compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
