import { Component, DestroyRef, Input, inject } from '@angular/core';
import { SeatService } from '../../../core/services/seat.service';
import { Seat } from '../../../core/models/seat.model';
import { SeatStatus } from '../../../core/enum/seat-status.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css',
})
export class SeatComponent {
  private readonly seatService = inject(SeatService);
  private readonly destroyRef = inject(DestroyRef);

  @Input() color: string = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--free-color');
  @Input() row: number = 0;
  @Input() seat: number = 0;

  public seatStatus: SeatStatus = SeatStatus.AVAILABLE;

  public selectSeat() {
    const selectedSeat: Seat = {
      row: this.row,
      seat: this.seat,
      status: this.seatStatus,
    };

    this.seatService.selectSeat(selectedSeat);

    this.seatService
      .getSelectedSeats()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedSeat) => {
        const seat = selectedSeat.find(
          (s) => s.row === this.row && s.seat === this.seat
        );
        this.updateColor(seat?.status as SeatStatus);
      });
  }

  private updateColor(status: string) {
    switch (status) {
      case SeatStatus.AVAILABLE:
        this.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue('--free-color');
        break;
      case SeatStatus.SELECTED:
        this.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue('--tertiary-color');
        break;
      case SeatStatus.OCCUPIED:
        this.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue('--occupied-color');
        break;
      default:
        this.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue('--free-color');
        break;
    }
  }
}
