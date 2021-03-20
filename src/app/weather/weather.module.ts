import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './components/weather/weather.component';
import { FormsModule } from '@angular/forms';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { TemperatureConverterPipe } from './pipes/temperature-converter.pipe';
import { SearchModule } from 'app/ui/search/search.module';
import { SlideToggleModule } from 'app/ui/slide-toggle/slide-toggle.module';
import { WeatherService } from './services/weather.service';
import { GeoLocationService } from './services/geo-location.service';
import { WeatherWeekDayComponent } from './components/weather-week-day/weather-week-day.component';


@NgModule({
  declarations: [
    WeatherComponent,
    WeatherForecastComponent,
    TemperatureConverterPipe,
    WeatherWeekDayComponent,
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    FormsModule,
    SearchModule,
    SlideToggleModule,
  ],
  providers: [
    WeatherService,
    GeoLocationService,
  ]
})
export class WeatherModule { }
