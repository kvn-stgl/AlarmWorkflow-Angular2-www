import {Component, OnInit, Input} from "@angular/core";  
import { Router }            from '@angular/router';

import { OperationService } from "./operation.service";
import { Operation } from './operation';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  constructor(private operationService: OperationService, private router: Router) {
    
    this.operationService.error$.subscribe(
      (error: any) => { 
        console.warn(error); 
      },
      (error: any) => { 
        console.error("errors$ error", error); throw error; 
      }
    );

    // Wire up a handler for the starting$ observable to log the
    //  success/fail result
    this.operationService.starting$.subscribe(
     () => { console.log("signalr service has been started"); },
     () => { console.warn("signalr service failed to start!"); }
    );

    let signalrClient = this.operationService.getHubProxy().client;

    signalrClient.settingsChanged = () => {
      console.log("Settings Changed. Reload Page.");
      location.reload();
    }

    this.operationService.reset.subscribe(() => {
      this.router.navigate(['/']);
    });

    this.operationService.receive.subscribe((operation: Operation) => {
      this.router.navigate(['/alarm', operation.id]);
    });
  }

  ngOnInit() {
    this.operationService.start();
  };
}
