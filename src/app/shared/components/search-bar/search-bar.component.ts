import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchState } from '@store/search/search.state';
import * as SearchActions from '@store/search/search.actions';

const MIN_SEARCH_LENGTH = 3;
const SEARCH_DELAY = 500;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  private debounceTimer = undefined;
  public searchParam: string = 'awesome repo';

  constructor(private searchStore: Store<SearchState>) {
  }

  ngOnInit() {
  }

  onSearch = () => {
    this.search();
  }

  search = () => {
    this.searchParam = this.searchParam.trim();
    if (this.searchParam.length >= MIN_SEARCH_LENGTH) {
      if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(
        (search_param: string) => {
          this.searchStore.dispatch(
            new SearchActions.SetSearchText(search_param)
          );
        },
        SEARCH_DELAY,
        this.searchParam
      );
    }
  }
}
