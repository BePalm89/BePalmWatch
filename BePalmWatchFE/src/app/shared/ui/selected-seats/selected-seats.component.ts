import { Component, Input } from '@angular/core';
import { Seat } from '../../../core/models/seat.model';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-selected-seats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-seats.component.html',
  styleUrl: './selected-seats.component.css',
})
export class SelectedSeatsComponent {

  @Input() public selectedSeatsList: Seat[] = [];

}
