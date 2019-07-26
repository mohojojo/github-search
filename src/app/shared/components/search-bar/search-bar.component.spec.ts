import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as SearchActions from '@store/search/search.actions';

import { SearchBarComponent } from './search-bar.component';
import { SharedModule } from '@app/shared/shared.module';
import { SearchState } from '@app/store/search/search.state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let dispatchSpy;

  let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };

  function getSearchButton() {
    return fixture.debugElement.nativeElement.querySelector('button');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [ SharedModule, NoopAnimationsModule ],
      providers: [ provideMockStore({ initialState }) ]
    })
    .compileComponents();

    store = TestBed.get<Store<SearchState>>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearch', async(() => {
    spyOn(component, 'onSearch');

    let button = getSearchButton();
    button.click();
  
    fixture.whenStable().then(() => {
      expect(component.onSearch).toHaveBeenCalled();
    });
  }));

  it('should dispatch SetSearchText after click', fakeAsync(() => {
    dispatchSpy = spyOn(store, 'dispatch');
    let button = getSearchButton();
    button.click();

    tick(500)
    fixture.detectChanges()

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new SearchActions.SetSearchText('awesome repo')
    );
  }));
});
