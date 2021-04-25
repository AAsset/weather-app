import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {

  transform(value: number, unit: 'C' | 'F') {
    if (!Number(value) || isNaN(Number(value))) {
      return '';
    }
    if (unit === 'C') {
      return Math.round(value) + '°C';
    }
    if (unit === 'F') {
      const tempF = value * 1.8 + 32;
      return Math.round(tempF) + '°F';
    }
    return '';
  }
}
