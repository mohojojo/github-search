import { Repository } from '@app/shared/models/search/models';

const mockrepoData: Repository[] = [{
    id: 1,
    description: 'awesome repo',
    html_url: 'testurl',
    stargazers_count: 24,
    fork_count: 100,
    open_issues_count: 14,
    full_name: 'fullname'
}];

export default mockrepoData;
