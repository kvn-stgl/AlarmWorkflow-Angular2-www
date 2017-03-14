import { Component, Input, OnChanges } from '@angular/core';
import { Operation } from '../operation';

import { AgmCoreModule, MapsAPILoader, MapTypeStyle } from 'angular2-google-maps/core';
import { AppConfig } from '../app.config';

declare var google: any;

@Component({
  selector: 'aw-alarm-gmap',
  templateUrl: 'html/gmap.component.html',
  styleUrls: [ 'css/gmap.component.css' ]
})
export class GmapComponent implements OnChanges {
  @Input()
  operation: Operation;
  zoom: number = 15;
  //type: string = "geometry";
  @Input()
  direction: boolean = true;

  address: string;
  originCoords: any;
  destinationCoords: any;

  constructor(private mapsAPILoader: MapsAPILoader, appConfig: AppConfig) {
    this.address = `${appConfig.getShared("FD.Street")} ${appConfig.getShared("FD.StreetNumber")}, 
      ${appConfig.getShared("FD.ZipCode")} ${appConfig.getShared("FD.City")}`;

    this.zoom = appConfig.getConfig("GoogleZoomLevel");
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

    //Only with direction
    if (this.direction) {
      this.mapsAPILoader.load().then(() => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': this.address
        }, (results: any, status: any) => {
          if (status == google.maps.GeocoderStatus.OK) {
            this.originCoords = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };
          } else {
            this.originCoords = null;
          }
        });
      });
    }
  }
}

