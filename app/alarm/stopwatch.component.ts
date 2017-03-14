import { Component, Input, OnChanges } from '@angular/core';
import { Operation } from '../operation';


@Component({
  selector: 'aw-alarm-stopwatch',
  template: `<div id="stopwatch"></div>`,
})
export class StopwatchComponent implements OnChanges {
  @Input()
  operation: Operation;

  text: string = '{M}:{ss} min seit Alarmierung';

  constructor() {}

  ngOnChanges() {
    if (!this.operation) return;

    let time = this.operation.timestampIncome;

    // Stopwatch
    let watch: any = $('#stopwatch');
    let startWatch = new Date().getTime() - new Date(time).getTime();
    try {
      // Destroy old stopwatch for a new operation
      watch.stopwatch('destroy');
    } catch (err) {}

    watch.stopwatch({
      format: this.text,
      startTime: startWatch
    });
    watch.stopwatch('start');
  }

}
