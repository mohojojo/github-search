import * as fromRoot from '../app.state';
import { IPaging, IIssue, IPageProps } from '../../shared/models/search/models';

export class IssuesState implements IPaging<IIssue> {
  items: IIssue[];
  loading: boolean;
  error: boolean;
  pageProps: IPageProps;
  total_count: number;
}

export interface State extends fromRoot.State {
  issues: IssuesState;
}
