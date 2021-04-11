import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IWeatherForecastResolved } from 'app/weather/interfaces/weather-forecast-resolved.interface';
import { IWeatherForecast } from 'app/weather/interfaces/weather-forecast.interface';
import { IWeatherParams } from 'app/weather/interfaces/weather-params.interface';
import { WeatherService } from 'app/weather/services/weather/weather.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class WeatherForecastResolverService implements Resolve<IWeatherForecastResolved> {

  constructor(private weatherService: WeatherService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IWeatherForecastResolved | Observable<IWeatherForecastResolved> | Promise<IWeatherForecastResolved> {
    return this.weatherService.fetchWeatherForecast(route.queryParams as IWeatherParams).pipe(
      map((weather: IWeatherForecast) => ({ weather })),
      catchError((err: HttpErrorResponse) => {
        throwError(err);
        return of({
          weather: null,
          error: err.error
        });
      })
    );
  }
}
