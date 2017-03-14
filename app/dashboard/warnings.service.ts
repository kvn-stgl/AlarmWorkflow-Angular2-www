import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class WarningsService {
  private baseUrl = devUrl + '/api/dwd';

  constructor(private http: Http) {}

  getWarning(): Observable < any > {
    return this.http.get(this.baseUrl)
      .map(response => this.extractData(response))
      .catch(this.handleError);
  }

  private extractData(res: any) {
    if (!res._body) {
      return null;
    }

    let body = res.json();

    let image = 'G5_Flower.png';

    switch (body.Type) {
      case 0:
        image = 'warn_icons_gewitter.png';
        break;
      case 1:
        image = 'warn_icons_sturm.png';
        break;
      case 2:
        image = 'warn_icons_regen.png';
        break;
      case 3:
        image = 'warn_icons_schnee.png';
        break;
      case 4:
        image = 'warn_icons_nebel.png';
        break;
      case 5:
        image = 'warn_icons_frost.png';
        break;
      case 6:
        image = 'warn_icons_glatteis.png';
        break;
      case 7:
        image = 'warn_icons_tauwetter.png';
        break;
      case 8:
        image = 'warn_icons_hitze.png';
        break;
      case 9:
        image = 'warn_icons_uv.png';
        break;
    }

    body.Image = image;

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
    // }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
