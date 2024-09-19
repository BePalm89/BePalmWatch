import { Injectable } from '@angular/core';
import { Showtime, Ticket } from '../models/showtime.model';
import { BehaviorSubject } from 'rxjs';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  public showtimeSubject = new BehaviorSubject<Showtime>({date: dayjs().format('ddd, DD.MM'), time: '16:00', totalPrice: 0});
  public ticketsSubject = new BehaviorSubject<Ticket[]>([]);

  public getShowtimeSubject(): BehaviorSubject<Showtime> {
    return this.showtimeSubject;
  }

  public getShowtime(): Showtime {
    return this.showtimeSubject.value;
  }

  public getTicket(): Ticket[] {
    return this.ticketsSubject.value;
  }

  public updateDate(newDate: string) {
    const currentShowtime = this.showtimeSubject.value;
    const updatedShowtime = {...currentShowtime, date: newDate};
    this.showtimeSubject.next(updatedShowtime);
  };

  public updateTime(newTime: string) {
    const currentShowtime = this.showtimeSubject.value;
    const updatedShowtime = {...currentShowtime, time: newTime};
    this.showtimeSubject.next(updatedShowtime);
  };

  public updatePrice(newPrice: number) {
    const currentShowtime = this.showtimeSubject.value;
    const updatedShowtime = {...currentShowtime, totalPrice: newPrice};
    this.showtimeSubject.next(updatedShowtime);
  }

  public resetShowtime() {
    return this.showtimeSubject.next({date: dayjs().format('ddd, DD.MM'), time: '16:00', totalPrice: 0})
  }

  public setSelectedSeat(selectedSeats: Ticket[]) {
    return this.ticketsSubject.next(selectedSeats);
  }

  public resetTickets() {
    return this.ticketsSubject.next([]);
  }
  
}
