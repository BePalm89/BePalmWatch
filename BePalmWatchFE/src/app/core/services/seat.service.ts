import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Seat } from '../models/seat.model';
import { SeatStatus } from '../enum/seat-status.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SeatService {

  private readonly snackbar = inject(MatSnackBar);
  public selectedSeatsSubject = new BehaviorSubject<Seat[]>([]);
  public occupiedSeatsSubject = new BehaviorSubject<Seat[]>([]);

  public selectSeat(seat: Seat) {
    const currentSeats = this.selectedSeatsSubject.value;
    
    const seatIndex = currentSeats.findIndex(s => s.row === seat.row && s.seat === seat.seat);

    if (seatIndex !== -1) {
      const updatedSeats = currentSeats.filter(s => !(s.row === seat.row && s.seat === seat.seat));
      this.selectedSeatsSubject.next(updatedSeats);
      seat.status = SeatStatus.AVAILABLE;
    } else if (currentSeats.length < 6) {
      seat.status = SeatStatus.SELECTED;
      this.selectedSeatsSubject.next([...currentSeats, seat]);
    } else {
      this.snackbar.open('You can only select up to 6 seats.', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    }

  }

   public getSelectedSeats(): BehaviorSubject<Seat[]> {
    return this.selectedSeatsSubject;
  } 

  public clearSelectedSeats() {
    return this.selectedSeatsSubject.next([]);
  }

  public setOccupiedSeats(seats: Seat[]) {
    this.occupiedSeatsSubject.next(seats);
  }

  public getOccupiedSeats(): BehaviorSubject<Seat[]> {
    return this.occupiedSeatsSubject;
  }

  public clearOccupiedSeats() {
    return this.occupiedSeatsSubject.next([]);
  }


}
