import { IPageProps } from '../../shared/models/search/models';

const defaultPaging = {
  page: 1,
  per_page: 10
};

export class ApiQueryBuilder {
  private name: String;
  private body: object;
  private paging: IPageProps;
  private query: String;

  constructor() { }

  addName(name: String) {
    this.name = name;
    return this;
  }

  addBody(body: object) {
    this.body = { ...body };
    return this;
  }

  addPaging(pagingData: any = null) {
    this.paging = { ...defaultPaging, ...pagingData };
    this.paging.page = pagingData.page + 1;

    let pagingQuery = '';
    for (var prop in this.paging) {
      pagingQuery += `&${prop}=${this.paging[prop]}`
    }

    this.query += pagingQuery;

    return this;
  }

  addQuery(queryObject: any) {
    let query = '';
    for (var prop in queryObject) {
      query += `&${prop}=${queryObject[prop]}`
    }

    this.query = query;
    return this;
  }

  addPageNumber(number: number) {
    this.paging.page = number;
    return this;
  }

  addPageSize(number: number) {
    this.paging.per_page = number;
    return this;
  }

  build() {
    // tslint:disable-next-line:prefer-const
    let returnObject = {
      name: this.name
    };

    if (this.body) {
      returnObject['body'] = { ...this.body };
    }

    if (this.paging) {
      returnObject['paging'] = { ...this.paging };
    }

    if (this.query) {
      returnObject['query'] = this.query;
    }

    return returnObject;
  }
}
