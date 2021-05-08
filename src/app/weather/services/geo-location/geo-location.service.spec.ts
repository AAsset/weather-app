import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { GeoLocationService } from './geo-location.service';

describe('GeoLocationService', () => {
  let service: GeoLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoLocationService]
    });
    service = TestBed.inject(GeoLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("getPosition() should return position", () => {
    const mockPosition = {
      coords: {
        latitude: 43.25,
        longitude: 76.95
      },
      timestamp: 1620453600
    };
    const fake =  {
      getPosition: () => of(mockPosition)
    };
    service = fake as GeoLocationService;

    service.getPosition().subscribe(data => {
      expect(data).toBeDefined();
      expect(data).not.toBe(null);
      expect(data.coords.latitude).toEqual(43.25);
      expect(data.coords.longitude).toEqual(76.95);
    })
  });
});
