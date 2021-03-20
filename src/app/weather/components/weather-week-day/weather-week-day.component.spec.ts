import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWeekDayComponent } from './weather-week-day.component';

describe('WeatherWeekDayComponent', () => {
  let component: WeatherWeekDayComponent;
  let fixture: ComponentFixture<WeatherWeekDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherWeekDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWeekDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
