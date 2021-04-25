import { TemperatureConverterPipe } from './temperature-converter.pipe';

describe('TemperatureConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new TemperatureConverterPipe();
    expect(pipe).toBeTruthy();
  });
  const pipe = new TemperatureConverterPipe();

  it('providing no value and format returns ""', () => {
    expect(pipe.transform(null, null)).toBe('');
  });

  it('providing no value returns ""', () => {
    expect(pipe.transform(null, 'C')).toBe('');
  });

  it('providing no format returns ""', () => {
    expect(pipe.transform(20, null)).toBe('');
  });

  it('providing a value and format "C" returns value with °C', () => {
    expect(pipe.transform(20, 'C')).toBe('20°C');
  });

  it('providing a value and format "F" returns value with °F', () => {
    expect(pipe.transform(30, 'F')).toBe('86°F');
  });
});
