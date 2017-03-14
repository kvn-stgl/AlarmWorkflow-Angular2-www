import { Component, OnInit } from '@angular/core';

import { AppConfig } from '../app.config';

@Component({  
  selector: 'my-dashboard',
  templateUrl: 'html/dashboard.component.html',
  styleUrls: [ 'css/dashboard.component.css' ]
})
export class DashboardComponent implements OnInit  {
  private fdName: string;

  constructor(private config: AppConfig) {
    this.fdName = config.getShared("FD.Name");
  }

  ngOnInit(): void {

  }
}