import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WeatherService } from 'app/weather/services/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent implements OnInit {

  constructor(private weatherService: WeatherService,
              private router: Router) { }

  ngOnInit(): void {
  }


  onSearch(value) {
    this.router.navigate(['/forecast'], { queryParams: { city: value }});
  }
}
