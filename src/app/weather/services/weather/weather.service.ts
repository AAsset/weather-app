import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, forkJoin } from 'rxjs';
import { IWeatherForecast } from 'app/weather/interfaces/weather-forecast.interface';
import { environment } from 'environments/environment';
import { map, catchError, flatMap, tap } from 'rxjs/operators';
import { IForecast, IForecastCity } from 'app/weather/interfaces/forecast.interface';
import { IWeatherParams } from 'app/weather/interfaces/weather-params.interface';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  public fetchWeatherForecast(params: IWeatherParams): Observable<IWeatherForecast | any> {
    return this.fetchForecastByCity(params).pipe(
      map(f => ({ city: f.city })),
      flatMap(data => forkJoin([
        this.fetchForecastByCoords(data.city.coord.lat, data.city.coord.lon),
        of(data.city),
      ])),
      tap(
        ([weather, city]: [IWeatherForecast, IForecastCity]) => ((weather.city = city))
      ),
      map(([weather]) => weather),
      catchError(this.handleError)
    );
  }

  public fetchForecastByCity(params: IWeatherParams): Observable<IForecast> {
    const obj: any = {
      cnt: 7,
      appid: environment.openweather_api_key
    };
    if (params.city) {
      obj.q = params.city;
    }
    if (params.lat) {
      obj.lat = params.lat;
    }
    if (params.lon) {
      obj.lon = params.lon;
    }
    const queryParams = new HttpParams({
      fromObject: obj
    });
    return this.http.get<IForecast>(`${environment.openweather_url}forecast?${queryParams}`);
  }

  public fetchForecastByCoords(lat: number, lon: number): Observable<IWeatherForecast> {
    const queryParams = new HttpParams({
      fromObject: {
        lat: `${lat}`,
        lon: `${lon}`,
        units: 'metric',
        appid: environment.openweather_api_key
      }
    });
    return this.http.get<IWeatherForecast>(
      `${environment.openweather_url}onecall?${queryParams}`
    ).pipe(
      map(w => this.mapToForecast(w)),
      catchError(this.handleError),
    );
  }

  private handleError(error: Error | HttpErrorResponse): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return throwError("It seems like you're not connected to the internet");
      }
      return throwError(error);
    }
    console.error('Oops:', error);
    return throwError('An error occurred. Please try again.');
  }

  private mapToForecast(data: any): IWeatherForecast {
    const forecast: IWeatherForecast = {
      temp: data.current ? data.current.temp : data.temp.day || '',
      date: data.current ? this.parseDateByTimezone(data.current.dt * 1000, data.timezone_offset) : data.dt * 1000,
      main: data.current ? data.current.weather[0].main : data.weather[0].main,
      description: data.current ? data.current.weather[0].description : data.weather[0].description,
      icon: data.current ? data.current.weather[0].icon : data.weather[0].icon,
      iconId: data.current ? data.current.weather[0].id : data.weather[0].id,
      morning: data.daily ? data.daily[0].temp.morn : data.temp.morn,
      day: data.daily ? data.daily[0].temp.day : data.temp.day,
      evening: data.daily ? data.daily[0].temp.eve : data.temp.eve,
      night: data.daily ? data.daily[0].temp.night : data.temp.night,
      daily: data.daily ? data.daily.slice(0, 7).map(d => this.mapToForecast(d)) : [],
    };

    return forecast;
  }

  private parseDateByTimezone(date, timezoneOffset: number) {
    const d = new Date(date);
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const pDate = utc + (1000 * timezoneOffset);
    return new Date(pDate);
  }
}
