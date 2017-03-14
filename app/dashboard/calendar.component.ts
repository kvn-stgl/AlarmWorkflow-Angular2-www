import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { CalendarService } from './calendar.service';
import { CalendarEntry } from './calendar.entry';

const intervalTime: number = 1000 * 60 * 60; //Update cal every 60 mins

@Component({  
  selector: 'aw-calendar',
  templateUrl: 'html/calendar.component.html',
  styleUrls: ['css/calendar.component.css']
})
export class CalendarComponent implements OnInit  {
  entries: CalendarEntry[];
  private intervalId : any;

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.getEntries(); 

    this.intervalId = setInterval(() => {  
      this.getEntries()
    }, intervalTime);
  }
    
  ngOnDestroy() {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getEntries(): void {
    this.calendarService.getEntries().then(entries => this.entries = entries);
  }
}