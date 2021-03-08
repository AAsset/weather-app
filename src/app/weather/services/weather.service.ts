import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IWeatherForecast } from '../interfaces/weather-forecast.interface';
import { environment } from 'environments/environment';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { IForecast } from '../interfaces/forecast.interface';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  public fetchWeatherForecast(cityName: string): Observable<IWeatherForecast> {
    return this.fetchForecastByCityName(cityName).pipe(
      map(f => f.city.coord),
      mergeMap(coord => this.fetchForecastByCoords(coord.lat, coord.lon)),
      map(w => this.mapToForecast(w)),
      catchError(this.handleError)
    );
  }

  public fetchForecastByCoords(lat: number, lon: number): Observable<IWeatherForecast> {
    const params = new HttpParams()
      .set('lat', `${lat}`)
      .set('lon', `${lon}`)
      .set('units', 'metric')
      .set('appid', environment.openweather_api_key);
    return this.http.get<IWeatherForecast>(environment.openweather_url + 'onecall', { params: params });
  }

  private fetchForecastByCityName(cityName: string): Observable<IForecast> {
    const params = new HttpParams()
      .set('q', cityName)
      .set('cnt', '7')
      .set('appid', environment.openweather_api_key);
    return this.http.get<IForecast>(environment.openweather_url + 'forecast', { params: params });
  }

  private handleError(error: Error | HttpErrorResponse): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return throwError("It seems like you're not connected to the internet");
      } else {
        return throwError(error);
      }
    } else {
      console.error('Oops:', error);
    }
    return throwError('An error occurred. Please try again.');
  }

  private mapToForecast(data: any): IWeatherForecast {
    const forecast: IWeatherForecast = {
      temp: data.current ? data.current.temp : data.temp.day || '',
      date: data.daily ? data.daily[0].dt * 1000 : data.dt * 1000,
      main: data.daily ? data.daily[0].weather[0].main : data.weather[0].main,
      description: data.daily ? data.daily[0].weather[0].description : data.weather[0].description,
      icon: data.daily ? data.daily[0].weather[0].icon : data.weather[0].icon,
      iconId: data.daily ? data.daily[0].weather[0].id : data.weather[0].id,
      morning: data.daily ? data.daily[0].temp.morn : data.temp.morn,
      day: data.daily ? data.daily[0].temp.day : data.temp.day,
      evening: data.daily ? data.daily[0].temp.eve : data.temp.eve,
      night: data.daily ? data.daily[0].temp.night : data.temp.night,
      daily: data.daily ? data.daily.slice(0, 7).map(d => this.mapToForecast(d)) : [],
      lat: data.lat,
      lon: data.lon,
      timezone: data.timezone
    };

    return forecast;
  }
}
