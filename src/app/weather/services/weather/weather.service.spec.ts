import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { WeatherService } from './weather.service';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
import { IWeatherParams } from 'app/weather/interfaces/weather-params.interface';
import { IForecast } from 'app/weather/interfaces/forecast.interface';
import { map } from 'rxjs/operators';
import { IWeatherForecast } from 'app/weather/interfaces/weather-forecast.interface';

describe('WeatherService', () => {
  let httpTestingController: HttpTestingController;
  let service: WeatherService;
  let mockParam: IWeatherParams;
  let mockResponseData: IForecast;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WeatherService,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherService);

    mockParam = {
      city: 'Almaty',
      lat: 43.25,
      lon: 76.95
    };

    mockResponseData = {
      city: {
        coord: {
          lat: 43.25,
          lon: 76.95
        },
        country: "KZ",
        id: 1526384,
        name: "Almaty",
        population: 2000900,
        sunrise: 1620430588,
        sunset: 1620482456,
        timezone: 21600,
      },
      cnt: 7,
      cod: "200",
      list: [],
      message: 0
    };
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchForecastByCity() with city name param should return weather from Almaty', (done) => {
    const queryParams = new HttpParams({
      fromObject: {
        cnt: '7',
        appid: environment.openweather_api_key,
        q: mockParam.city
      }
    });

    service.fetchForecastByCity({
      city: mockParam.city,
      lat: null,
      lon: null
    }).subscribe(data => {
      expect(data).toBeDefined();
      expect(data).not.toBe(null);
      expect(data.city.name).toEqual('Almaty');
      expect(data).toEqual(mockResponseData);
      done();
    });

    const testRequest = httpTestingController.expectOne(`${environment.openweather_url}forecast?${queryParams}`);

    testRequest.flush(mockResponseData);
  });

  it('fetchForecastByCity() with lat, lon param should return weather from Almaty', (done) => {
    const queryParams = new HttpParams({
      fromObject: {
        cnt: '7',
        appid: environment.openweather_api_key,
        lat: `${mockParam.lat}`,
        lon: `${mockParam.lon}`
      }
    });

    service.fetchForecastByCity({
      city: null,
      lat: mockParam.lat,
      lon: mockParam.lon
    }).subscribe(data => {
      expect(data).toBeDefined();
      expect(data).not.toBe(null);
      expect(data.city.name).toEqual('Almaty');
      expect(data.city.coord.lat).toEqual(43.25);
      expect(data.city.coord.lon).toEqual(76.95);
      expect(data).toEqual(mockResponseData);
      done();
    });

    const testRequest = httpTestingController.expectOne(`${environment.openweather_url}forecast?${queryParams}`);

    testRequest.flush(mockResponseData);
  });

  it('fetchForecastByCoords() with lat, lon param should return weather from Almaty', (done) => {
    const queryParams = new HttpParams({
      fromObject: {
        lat: `${mockParam.lat}`,
        lon: `${mockParam.lon}`,
        units: 'metric',
        appid: environment.openweather_api_key,
      }
    });
    const mockData: IWeatherForecast = {
      temp: 26,
      main: "Rain",
      description: "light rain",
      icon: "10d",
      iconId: 500,
      morning: 15.59,
      day: 21.86,
      evening: 25.38,
      night: 19.1,
      daily: [],
      date: 1620453600,
      city: {
        country: "KZ",
        id: 1526384,
        name: "Almaty",
        population: 2000900,
        sunrise: 1620430588,
        sunset: 1620482456,
        timezone: 21600,
        coord: {
          lat: 43.25,
          lon: 76.95
        },
      },
    };
    const mapToForecastSpy = spyOn(service as any, 'mapToForecast');

    mapToForecastSpy.and.callFake((data) => {
      return {
        ...mockData,
        date: parseDateByTimezoneSpy(mockData.date, mockData.city.timezone)
      }
    });

    const parseDateByTimezoneSpy = spyOn(service as any, 'parseDateByTimezone');

    parseDateByTimezoneSpy.and.callFake((date, timezoneOffset) => {
      const d = new Date(date);
      return new Date(d.getTime() + d.getTimezoneOffset() * 60000 + 1000 * timezoneOffset);
    });

    service.fetchForecastByCoords(mockParam.lat, mockParam.lon)
    .pipe(
      map(data => mapToForecastSpy(data))
    )
    .subscribe(data => {
      expect(data).toBeDefined();
      expect(data).not.toBe(null);
      expect(data.city.name).toEqual('Almaty');
      expect(data.city.coord.lat).toEqual(43.25);
      expect(data.city.coord.lon).toEqual(76.95);
      expect(data.temp).toEqual(26);
      expect(data.main).toEqual('Rain');
      expect(data.icon).toEqual('10d');
      expect(mapToForecastSpy).toHaveBeenCalled();
      expect(parseDateByTimezoneSpy).toHaveBeenCalled();
      done();
    });

    const testRequest = httpTestingController.expectOne(`${environment.openweather_url}onecall?${queryParams}`);

    testRequest.flush(mockData);
  });
});
