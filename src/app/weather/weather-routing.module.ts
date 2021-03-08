import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';


const routes: Routes = [
  { path: '', component: WeatherComponent },
  { path: 'forecast', component: WeatherForecastComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
