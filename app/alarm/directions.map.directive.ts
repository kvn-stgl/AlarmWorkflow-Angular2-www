import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core';
import { Directive,  Input} from '@angular/core';

declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() origin: any;
  @Input() destination: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.gmapsApi.getNativeMap().then(map => {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: {
          lat: this.origin.lat,
          lng: this.origin.lng
        },
        destination: {
          lat: this.destination.lat,
          lng: this.destination.lng
        },
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response: any, status: any) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    });
  }
}
