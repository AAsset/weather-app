import { Injectable } from '@angular/core';
import { IGeolocationPosition } from 'app/weather/interfaces/geo-location-position.interface';
import { Observable } from 'rxjs';

@Injectable()
export class GeoLocationService {

  constructor() { }

  getPosition(): Observable<IGeolocationPosition> {
    return new Observable(obs => {
      if (window.navigator && window.navigator.geolocation) {
        return window.navigator.geolocation.getCurrentPosition(
          (position: IGeolocationPosition) => {
            obs.next(position);
            obs.complete();
          },
          (error) => obs.error(error)
        );
      }
      return obs.error({
        message: 'Unsupported Browser',
      });
    });
  }
}
