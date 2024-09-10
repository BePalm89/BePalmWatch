import { Component } from '@angular/core';
import { SeatRowComponent } from '../seat-row/seat-row.component';

@Component({
  selector: 'app-seat-area',
  standalone: true,
  imports: [SeatRowComponent],
  templateUrl: './seat-area.component.html',
  styleUrl: './seat-area.component.css'
})
export class SeatAreaComponent  {

  private readonly NUMBER_OF_ROWS = 11;

  public rows = Array(this.NUMBER_OF_ROWS).fill(null);


}
