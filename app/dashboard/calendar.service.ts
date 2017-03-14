import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { CalendarEntry } from './calendar.entry';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class CalendarService {
  private calendarUrl = devUrl + '/api/calendar';

  constructor(private http: Http) {}

  getEntries(): Promise < CalendarEntry[] > {
    return this.http.get(this.calendarUrl)
      .toPromise()
      .then(response => response.json() as CalendarEntry[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}