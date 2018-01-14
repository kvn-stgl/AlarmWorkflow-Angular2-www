import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AppConfig } from '../app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class WeatherService {
  private lang = 'lang:DL'; //DL = German
  private apiKey = '';
  private city = '';

  private baseUrl = 'http://api.wunderground.com/api/';

  constructor(private http: Http, private config: AppConfig) {
    this.apiKey = config.getConfig('WeatherUndergroundKey');
    this.city = config.getConfig('WeatherUndergroundCity');
  }

  getCity(): string {
    return this.city;
  }

  getWeather(): Promise<any>{
    let url = this.baseUrl + this.apiKey + '/forecast/' + this.lang + '/q/' + this.city + '.json';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError (error: any) {
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
