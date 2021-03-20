import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IWeatherForecast } from 'app/weather/interfaces/weather-forecast.interface';

@Component({
  selector: 'app-weather-week-day',
  templateUrl: './weather-week-day.component.html',
  styleUrls: ['./weather-week-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWeekDayComponent implements OnInit {
  @Input() day: IWeatherForecast;
  @Input() tempConverter: 'C' | 'F';

  constructor() { }

  ngOnInit(): void {
  }

}
