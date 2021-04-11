import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Params, Router } from '@angular/router';
import { IGeolocationPosition } from 'app/weather/interfaces/geo-location-position.interface';
import { GeoLocationService } from 'app/weather/services/geo-location/geo-location.service';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject();

  constructor(private geoLocationService: GeoLocationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSearch(value: string) {
    this.onForecastNavigate({
      city: value
    });
  }

  onCurrentPosition() {
    this.geoLocationService.getPosition()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (position: IGeolocationPosition) => this.onForecastNavigate({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
        (error) => alert(error.message)
      );
  }

  onForecastNavigate(queryParams: Params) {
    this.router.navigate(['/forecast'], { queryParams });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
