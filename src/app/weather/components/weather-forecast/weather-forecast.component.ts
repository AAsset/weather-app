import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, catchError } from 'rxjs/operators';
import { Subject, Observable, of, throwError } from 'rxjs';
import { IWeatherForecast } from 'app/weather/interfaces/weather-forecast.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent implements OnInit, OnDestroy {
  tempConverter: 'C' | 'F' = 'C';
  weather$: Observable<IWeatherForecast>;
  errorObject$: Observable<Error | HttpErrorResponse>;

  destroyed$ = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.weather$ = of(this.route.snapshot.data.weather).pipe(
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
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
