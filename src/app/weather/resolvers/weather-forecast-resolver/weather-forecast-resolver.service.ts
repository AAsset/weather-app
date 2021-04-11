import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IWeatherForecast } from 'app/weather/interfaces/weather-forecast.interface';
import { IWeatherParams } from 'app/weather/interfaces/weather-params.interface';
import { WeatherService } from 'app/weather/services/weather/weather.service';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherForecastResolverService implements Resolve<IWeatherForecast> {

  constructor(private weatherService: WeatherService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IWeatherForecast | Observable<IWeatherForecast> | Promise<IWeatherForecast> {
    return this.weatherService.fetchWeatherForecast(route.queryParams as IWeatherParams);
  }
}
