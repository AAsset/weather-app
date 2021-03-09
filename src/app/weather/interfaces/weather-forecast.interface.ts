import { IForecastCity } from './forecast.interface';

export interface IWeatherForecast {
  temp: number;
  date: Date | number;
  main: string;
  description: string;
  icon: string;
  iconId: number;
  morning: number;
  day: number;
  evening: number;
  night: number;
  daily?: IWeatherForecast[];
  city?: IForecastCity;
}
