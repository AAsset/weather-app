import { HttpErrorResponse } from "@angular/common/http";
import { IWeatherForecast } from "./weather-forecast.interface";

export interface IWeatherForecastResolved {
    weather: IWeatherForecast | null,
    error?: Error | HttpErrorResponse | null,
}
