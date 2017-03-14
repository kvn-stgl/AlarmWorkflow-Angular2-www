import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AppConfig } from '../app.config';
import { OperationService } from '../operation.service';
import { Operation } from '../operation';

import '../rxjs-extensions';

@Component({
  selector: 'aw-alarm',
  templateUrl: 'html/alarm.component.html',
  styleUrls: [ 'css/alarm.component.css' ]
})

export class AlarmComponent implements OnInit, OnDestroy {
  operation: Operation;
  private timeoutId: any;
  private timeoutTime: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private operationService: OperationService,
    private appConfig: AppConfig) {
      this.timeoutTime = this.appConfig.getConfig('MaxAge') * 60 * 1000;
    }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.operationService.getOperation(+params['id']))
      .subscribe(operation => {
        this.operation = operation;
        console.log(operation);

        // Start timer just for not acknowledged operation
        if (!operation.isAcknowledged) {
          console.log('Set Alarm Timeout: ', this.timeoutTime);
          this.timeoutId = setTimeout(() => {
            this.goBack();
          }, this.timeoutTime);
        }
    });
  }

  ngOnDestroy() {
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  goBack(): void {
    this.operationService.resetOperation();
    this.router.navigate(['/']);
  }
}
