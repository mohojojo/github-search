import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ApiConstants } from './api.constants';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {

  constructor(
    private http: HttpClient,
  ) { }

  constructApiCall(params) {
    // needs to be fixed
    const apiConfig = ApiConstants[params.name];
    const apiUrl = `${environment.apiEndpointUrl}${apiConfig.endPoint}${params.query ? '?' + params.query : ''}`;
    // tslint:disable-next-line:prefer-const
    let configObject = {};

    if ((apiConfig.method === 'POST' || apiConfig.method === 'PUT') && !params.isFile ) {
      configObject['body'] = { ...params.body };
    }

    if ( params.isFile && apiConfig.method === 'POST') {
      configObject['body'] = params.body.data;
    }

    return this.http.request(apiConfig.method, apiUrl, configObject)
      .pipe(
        catchError(
          error => {
            return throwError(error);
          }
        )
      );
  }
}
