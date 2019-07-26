import mockRepoData from './RepositoriesData';
import { Repository } from '@app/shared/models/search/models';
import { SearchState } from '@app/store/search/search.state';

export default class MockSearchState extends SearchState {
  public items: Repository[] = mockRepoData;
  public loading = false;
  public error = false;
  public searchText = '';
  public pageProps = { page: 0, per_page: 10 };
  public total_count = 0;
  public selectedRepo = null;
}