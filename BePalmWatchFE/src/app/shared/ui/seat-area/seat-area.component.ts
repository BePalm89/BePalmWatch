import { Component, Input } from '@angular/core';
import { SeatRowComponent } from '../seat-row/seat-row.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seat-area',
  standalone: true,
  imports: [SeatRowComponent, CommonModule],
  templateUrl: './seat-area.component.html',
  styleUrl: './seat-area.component.css'
})
export class SeatAreaComponent  {

  @Input() data!: any;
  private readonly NUMBER_OF_ROWS = 11;

  public rows = Array(this.NUMBER_OF_ROWS).fill(null);


}
