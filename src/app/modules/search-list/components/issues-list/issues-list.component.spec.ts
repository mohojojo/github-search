import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { IssuesListComponent } from './issues-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { IssuesState } from '@app/store/issues/issues.state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IssuesReducer } from '@app/store/issues/issues.reducer';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SearchReducer } from '@app/store/search/search.reducer';

describe('IssuesListComponent', () => {
  let component: IssuesListComponent;
  let fixture: ComponentFixture<IssuesListComponent>;

  let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesListComponent ],
      imports: [ SharedModule, NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('issues', IssuesReducer),
        StoreModule.forFeature('search', SearchReducer) ],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();

    store = TestBed.get<Store<IssuesState>>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
