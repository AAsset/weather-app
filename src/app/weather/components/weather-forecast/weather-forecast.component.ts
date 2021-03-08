import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from 'app/weather/services/weather.service';
import { takeUntil, catchError } from 'rxjs/operators';
import { Subject, Observable, of, throwError } from 'rxjs';
import { IWeatherForecast } from 'app/weather/interfaces/weather-forecast.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit, OnDestroy {
  cityName: string;
  currentDate: Date = new Date();
  tempConverter: 'C' | 'F' = 'C';
  weather$: Observable<IWeatherForecast>;
  errorObject$: Observable<Error | HttpErrorResponse>;

  destroyed$ = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        this.cityName = params.city || 'city not found';
        this.cityName ? this.fetchWeatherForecast() : '';
      });
  }

  fetchWeatherForecast() {
    this.weather$ = this.weatherService.fetchWeatherForecast(this.cityName)
      .pipe(
        catchError(err => {
          this.errorObject$ = of(err.error);
          throwError(err);
          return of(null);
        }),
        takeUntil(this.destroyed$)
      );
  }

  onToggle(value) {
    this.tempConverter = value ? 'C' : 'F';
  }

  onNavigateBack() {
    this.router.navigate(['/']);
  }

  trackByFn(index, item) {
    return item.date;
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
