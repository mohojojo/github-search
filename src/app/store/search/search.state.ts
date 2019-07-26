import * as fromRoot from './../app.state';
import { IPaging, Repository, IPageProps } from '../../shared/models/search/models';

export class SearchState implements IPaging<Repository> {
  items: Repository[];
  loading: boolean;
  error: boolean;
  searchText: string;
  pageProps: IPageProps;
  total_count: number;
  selectedRepo: Repository;
}

export interface State extends fromRoot.State {
  search: SearchState;
}
