import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { LandingComponent } from './landing.component';
import { SearchBarComponent } from '@app/shared/components/search-bar/search-bar.component';
import { SearchListComponent } from '../search-list/search-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { SearchState } from '@app/store/search/search.state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchReducer } from '@app/store/search/search.reducer';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingComponent, SearchBarComponent, SearchListComponent ],
      imports: [ SharedModule, NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('search', SearchReducer) ]
    })
    .compileComponents();

    store = TestBed.get<Store<SearchState>>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
