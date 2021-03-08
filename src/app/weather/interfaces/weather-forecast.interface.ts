export interface IWeatherForecast {
  temp: number;
  date: number;
  main: string;
  description: string;
  icon: string;
  iconId: number;
  morning: number;
  day: number;
  evening: number;
  night: number;
  daily?: IWeatherForecast[];
  lat: number;
  lon: number;
  timezone: string;
}
