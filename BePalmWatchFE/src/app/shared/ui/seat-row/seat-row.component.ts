import { Component, Input } from '@angular/core';
import { SeatComponent } from '../seat/seat.component';

@Component({
  selector: 'app-seat-row',
  standalone: true,
  imports: [SeatComponent],
  templateUrl: './seat-row.component.html',
  styleUrl: './seat-row.component.css'
})
export class SeatRowComponent {

  public readonly SEAT_NUMBER_PER_ROW = 5;

  @Input() rowIndex!: number; 
  
  leftSeat = Array(this.SEAT_NUMBER_PER_ROW).fill(null);
  rightSeat = Array(this.SEAT_NUMBER_PER_ROW).fill(null);



}
