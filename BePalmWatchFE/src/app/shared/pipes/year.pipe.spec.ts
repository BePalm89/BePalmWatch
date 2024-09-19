import { YearPipe } from './year.pipe';

describe('YearPipe', () => {
  let pipe: YearPipe;

  beforeEach(() => {
    pipe = new YearPipe();
  })
  it('create an instance', () => {
    const pipe = new YearPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return just the year of the entire date', () => {
    expect(pipe.transform('2024-07-24')).toBe('2024');
  });

  it('Should return an empty string if there is not value', () => {
    expect(pipe.transform('')).toBe('');
  });

});
