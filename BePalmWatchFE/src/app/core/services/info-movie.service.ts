import { Injectable } from '@angular/core';
import dayjs from "dayjs";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoMovieService {

  public day: string = dayjs().format('ddd, DD.MM');
  public time = new BehaviorSubject<string>('16:00');
  public cost: number = 0;


  public getDay(): string {
    return this.day;
  }

  public setDay(day: string) {
    return this.day = day;
  }

  public getTime(): BehaviorSubject<string> {
    return this.time;
  }

  public setTime(time: string) {
    return this.time.next(time);
  }

  public getCost(): number {
    return this.cost;
  }

  public setCost(cost: number){
    return this.cost = cost;
  }

  public resetTime() {
    return this.time.next('16:00');
  }

}
