import { Component, Input } from '@angular/core';
import { Operation } from '../operation';


@Component({
  selector: 'aw-alarm-info',
  templateUrl: 'html/alarm.info.component.html',
  styleUrls: [ 'css/alarm.info.component.css' ]
})

export class AlarmInfoComponent {
  @Input()
  operation: Operation;
}
