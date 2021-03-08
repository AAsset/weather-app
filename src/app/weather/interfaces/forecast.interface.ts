export interface IForecast {
  city: IForecastCity;
  cnt: number;
  cod: string;
  list: any[];
  message: number;
}

export interface IForecastCity {
  coord: IForecastCoord;
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface IForecastCoord {
  lat: number,
  lon: number;
}
