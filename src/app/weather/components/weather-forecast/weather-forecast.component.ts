import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';
import { IWeatherForecast } from 'app/weather/interfaces/weather-forecast.interface';
import { IWeatherForecastResolved } from 'app/weather/interfaces/weather-forecast-resolved.interface';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent implements OnInit, OnDestroy {
  tempConverter: 'C' | 'F' = 'C';
  weatherForecast$: Observable<IWeatherForecastResolved>;

  destroyed$ = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.weatherForecast$ = of(this.route.snapshot.data.weather).pipe(
      takeUntil(this.destroyed$)
    );
  }

  onToggle(value: string) {
    this.tempConverter = value ? 'C' : 'F';
  }

  onNavigateBack() {
    this.router.navigate(['/']);
  }

  trackByFn(index: number, item: IWeatherForecast) {
    return item.date;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
