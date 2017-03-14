import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Operation } from '../operation';

import { ResourcesService } from './resources.service';
import { OperationService } from '../operation.service'

@Component({
  selector: 'aw-alarm-resources',
  templateUrl: 'html/resources.component.html',
  styleUrls: ['css/resources.component.css']
})
export class ResourcesComponent implements OnChanges, OnInit {
  @Input()
  operation: Operation;

  resources: any;

  constructor(private resourcesService: ResourcesService, private operationService: OperationService) {}

  ngOnInit() {
    this.operationService.resources.subscribe(opId => {
      if(this.operation.id == opId) {
        this.loadResources();
      }
    });
  }

  ngOnChanges() {
    if (!this.operation) return;
    this.loadResources();
  }

  private loadResources() {
    this.resourcesService.getResources(this.operation.id).subscribe((resources) => this.resources = resources);
  }
}
