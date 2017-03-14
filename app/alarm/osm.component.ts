import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Operation } from '../operation';

import { AppConfig } from '../app.config';

@Component({
  selector: 'aw-alarm-osm',
  templateUrl: 'html/osm.component.html',
  styleUrls: ['css/osm.component.css']
})
export class OsmComponent implements OnChanges, OnInit {
  @Input()
  operation: Operation;
  zoom: number;

  private destinationCoords: L.LatLngExpression;
  private osmMarker: L.Marker;
  private map: L.Map;

  constructor(appConfig: AppConfig) {
      this.zoom = appConfig.getConfig("OSMZoomLevel");
  }

  ngOnInit() {
    this.map = L.map("osmap", {
      zoomControl: false,
      minZoom: 4,
      maxZoom: 17
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.tileLayer('http://www.openfiremap.org/hytiles/{z}/{x}/{y}.png').addTo(this.map);

    this.changeOperation();
  }

  ngOnChanges() {
    if (!this.operation) return;

    if (this.operation.einsatzort.geoLatitude) {
      this.destinationCoords = {
        lat: this.operation.einsatzort.geoLatitude,
        lng: this.operation.einsatzort.geoLongitude
      };
    } else {
      this.destinationCoords = null;
    }

    if(this.map) {
        this.changeOperation();
    }
  }

  changeOperation() {
      if(this.destinationCoords) {
        this.map.setView(this.destinationCoords, this.zoom);
        this.addOsmMarker(this.destinationCoords);
      } else {
        this.map.setView([0, 0], 5); //Todo better error handling
        if(this.osmMarker) {
            this.osmMarker.remove();
            this.osmMarker = null;
        }
      }
  }

  addOsmMarker(location: L.LatLngExpression) {
    if (this.osmMarker == null) {
      this.osmMarker = L.marker(location);
      this.osmMarker.addTo(this.map);
    } else {
      this.osmMarker.setLatLng(location);
    }
  }
}
