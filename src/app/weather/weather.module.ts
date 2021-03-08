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


@NgModule({
  declarations: [
    WeatherComponent,
    WeatherForecastComponent,
    TemperatureConverterPipe,
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    FormsModule,
    SearchModule,
    SlideToggleModule,
  ],
  providers: [WeatherService]
})
export class WeatherModule { }
