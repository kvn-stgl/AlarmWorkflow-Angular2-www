import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ResourcesService {
  private baseUrl = devUrl + '/api/operation/GetResources/';

  constructor(private http: Http) {}

  getResources(id: number): Promise < any > {
    return this.http.get(this.baseUrl + id)
      .toPromise()
      .then(response => this.extractData(response))
      .catch(this.handleError);
  }

  private extractData(res: any) {
    if(!res._body) {
      return null;
    }

    let body = res.json();
    return body;
  }

  private handleError(error: any) {
    let errMsg: string;
    // if (error instanceof Response) {
    //   const body = error.json() || '';
    //   const err = body.error || JSON.stringify(body);
    //   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    // } else {
    errMsg = error.message ? error.message : error.toString();
    //}
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
