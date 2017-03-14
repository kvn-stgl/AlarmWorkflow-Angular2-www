import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { WarningsService } from './warnings.service';

const intervalTime: number = 1000 * 60 * 30; //Update warnings every 30 mins

@Component({  
  selector: 'aw-warnings',
  templateUrl: 'html/warnings.component.html',
  styleUrls: [ 'css/warnings.component.css' ]
})
export class WarningsComponent implements OnInit  {
  warning: any;
  private intervalId : any;

  constructor(private WarningsService: WarningsService) { }

  ngOnInit(): void {
    this.getWarnings();
    
    this.intervalId = setInterval(() => {  
      this.getWarnings()
    }, intervalTime);
  }
    
  ngOnDestroy() {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getWarnings() {
    this.WarningsService.getWarning().subscribe(result => {
      this.warning = result;
    });
  }
}