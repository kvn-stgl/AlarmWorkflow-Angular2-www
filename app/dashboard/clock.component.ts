import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

@Component({  
  selector: 'aw-clock',
  template: `
    <div #clock>
        <h1 id="time">87</h1>
        <h2 id="date"></h2>
    </div>`
})
export class ClockComponent implements AfterViewInit  {
  @ViewChild('clock') el:ElementRef;

  ngAfterViewInit(): void {
    $(this.el.nativeElement).simpleClock();
  }
}