import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocationService } from 'app/weather/services/geo-location.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  onSearch(value) {
    this.onForecastNavigate({
      city: value
    });
  }

  onCurrentPosition() {
    this.geoLocationService.getPosition()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(position => {
        this.onForecastNavigate({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
  }

  onForecastNavigate(queryParams) {
    this.router.navigate(['/forecast'], { queryParams });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
