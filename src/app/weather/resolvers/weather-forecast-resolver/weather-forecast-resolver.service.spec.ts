import { TestBed } from '@angular/core/testing';

import { WeatherForecastResolverService } from './weather-forecast-resolver.service';

describe('WeatherForecastResolverService', () => {
  let service: WeatherForecastResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherForecastResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
