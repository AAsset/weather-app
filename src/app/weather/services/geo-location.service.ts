import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GeoLocationService {

  constructor() { }

  getPosition(): Observable<Position> {
    return new Observable(obs => {
      if(window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            obs.next(position);
            obs.complete();
          },
          (error) => obs.error(error)
        );
      } else {
        obs.error('Unsupported Browser');
      }
    });
  }
}
