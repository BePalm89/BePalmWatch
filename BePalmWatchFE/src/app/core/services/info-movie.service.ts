import { Injectable } from '@angular/core';
import dayjs from "dayjs";

@Injectable({
  providedIn: 'root'
})
export class InfoMovieService {

  public day: string = dayjs().format('ddd, DD.MM');
  public time: string = '16:00';

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
