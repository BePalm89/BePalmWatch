import { Component, DestroyRef, OnDestroy, inject } from '@angular/core';
import { SeatService } from '../../../core/services/seat.service';
import { Seat } from '../../../core/models/seat.model';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-selected-seats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-seats.component.html',
  styleUrl: './selected-seats.component.css',
})
export class SelectedSeatsComponent {
  private readonly seatService = inject(SeatService);
  private readonly destroyRef = inject(DestroyRef);
  public selectedSeats: Seat[] = [];

  constructor() {
    this.seatService
      .getSelectedSeats()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.selectedSeats = value;
      });
  }
}
