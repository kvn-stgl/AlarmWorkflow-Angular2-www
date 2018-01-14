import {Component, OnInit} from '@angular/core';

import { WeatherService } from './weather.service';

const intervalTime: number = 1000 * 60 * 60; //Update weather every 60 mins

@Component({
  selector: 'aw-weather',
  templateUrl: 'html/weather.component.html',
  styleUrls: [ 'css/weather-icons.css', 'css/weather.component.css' ]
})
export class WeatherComponent implements OnInit  {
  forecast: any;
  city: string;

  private intervalId: any;

  constructor(private weatherService: WeatherService) {
    this.city = weatherService.getCity();
  }

  ngOnInit(): void {
    this.getForecast();

    this.intervalId = setInterval(() => {
      this.getForecast();
    }, intervalTime);
  }


  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getForecast(): void {
    this.weatherService.getWeather().then(result => {
      let tmp = result.forecast.simpleforecast.forecastday.slice(0, 3);
      this.forecast = tmp;
    });
  }
}
