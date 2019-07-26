export class Repository {
    id: number;
    description: string;
    html_url: string;
    stargazers_count: number;
    fork_count: number;
    open_issues_count: number;
    full_name: string;

    constructor(repo: any) {
        this.id = repo.id;
        this.description = repo.description;
        this.html_url = repo.html_url;
        this.fork_count = repo.fork_count;
        this.stargazers_count = repo.stargazers_count;
        this.open_issues_count = repo.open_issues_count;
        this.full_name = repo.full_name;
    }
}

export interface IIssue {
    html_url: string;
    title: string;
    number: number;
}

export interface IPageProps {
    per_page: number;
    page: number;
}

export interface IPaging<T> {
    items: T[];
    total_count: number;
    pageProps: IPageProps;
}
