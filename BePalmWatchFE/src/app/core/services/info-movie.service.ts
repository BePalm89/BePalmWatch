import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoMovieService {


  public day: string = '';
  public time: string = '';

  public setDay(day: string) {
    return this.day = day;
  }

  public setTime(time: string) {
    return this.time = time;
  }

  public getDay(): string {
    return this.day;
  }

  public getTime(): string {
    return this.time;
  }

}
