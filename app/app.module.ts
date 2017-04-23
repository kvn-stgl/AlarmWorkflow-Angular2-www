import './rxjs-extensions';

import { NgModule, LOCALE_ID, APP_INITIALIZER, ErrorHandler }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { DirectionsMapDirective } from './alarm/directions.map.directive';

import { AwErrorHandler } from './aw.error.handler';
import { AppConfig } from './app.config'
import { AppComponent }  from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ClockComponent }   from './dashboard/clock.component';
import { CalendarComponent }   from './dashboard/calendar.component';
import { WeatherComponent } from './dashboard/weather.component'
import { WarningsComponent } from './dashboard/warnings.component'

import { AlarmComponent } from './alarm/alarm.component';
import { AlarmInfoComponent } from './alarm/alarm.info.component';
import { GmapComponent } from './alarm/gmap.component';
import { OsmComponent } from './alarm/osm.component';
import { ResourcesComponent } from './alarm/resources.component';
import { StopwatchComponent } from './alarm/stopwatch.component';

import { WeatherService } from './dashboard/weather.service';
import { WarningsService } from './dashboard/warnings.service';
import { CalendarService } from './dashboard/calendar.service';
import { ResourcesService } from './alarm/resources.service';
import { OperationService } from './operation.service';

import { UcFirstPipe } from './pipes/ucfirst.pipe';

import { AppRoutingModule }     from './app-routing.module';
import { SignalrWindow } from './signalr';

(window as SignalrWindow).$.connection.hub.url = devUrl + '/signalr';

function initConfig(config: AppConfig) {
 return () => config.load();
}

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ClockComponent,
    CalendarComponent,
    WeatherComponent,
    WarningsComponent,
    AlarmComponent,
    AlarmInfoComponent,
    UcFirstPipe,
    GmapComponent,
    DirectionsMapDirective,
    OsmComponent,
    ResourcesComponent,
    StopwatchComponent
  ],
  providers: [
    AppConfig,
    { provide: ErrorHandler, useClass: AwErrorHandler },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: SignalrWindow, useValue: window },
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true },
    CalendarService,
    WeatherService,
    WarningsService,
    OperationService,
    ResourcesService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
