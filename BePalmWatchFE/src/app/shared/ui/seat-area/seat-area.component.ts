import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SeatComponent } from "../seat/seat.component";
import { SeatService } from "../../../core/services/seat.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SeatStatus } from "../../../core/enum/seat-status.enum";

@Component({
  selector: "app-seat-area",
  standalone: true,
  imports: [CommonModule, SeatComponent],
  templateUrl: "./seat-area.component.html",
  styleUrl: "./seat-area.component.css",
})
export class SeatAreaComponent implements OnInit {
  private readonly seatService = inject(SeatService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly ROWS_NUMBER = 11;
  public readonly SEAT_NUMBER_PER_ROW = 5;

  seatRows: {
    id: number;
    status: SeatStatus;
    rowNumber: number;
    seatNumber: number;
  }[][] = [];

  ngOnInit(): void {
    this.generateSeats(this.ROWS_NUMBER, this.SEAT_NUMBER_PER_ROW);
    this.markOccupiedSeats() ;
  }

  public onSelectedSeat(seatId: number) {
    for (let row of this.seatRows) {
      const seat = row.find((s) => s.id === seatId);
      if (seat && seat.status === SeatStatus.AVAILABLE) {
        seat.status = SeatStatus.SELECTED;
      } else if (seat && seat.status === SeatStatus.SELECTED) {
        seat.status = SeatStatus.AVAILABLE;
      }
    }
  }

  public getColor(status: SeatStatus): string {
    switch (status) {
      case SeatStatus.OCCUPIED:
        return getComputedStyle(document.documentElement).getPropertyValue(
          "--occupied-color"
        );
      case SeatStatus.SELECTED:
        return getComputedStyle(document.documentElement).getPropertyValue(
          "--tertiary-color"
        );
      default:
        return getComputedStyle(document.documentElement).getPropertyValue(
          "--free-color"
        );
    }
  }

  private markOccupiedSeats() {
    this.seatService.getOccupiedSeats().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((seats) => {
      for ( let seatsInfo of seats) {
        const row = this.seatRows[seatsInfo.row -1];
        const seat = row.find(s => s.seatNumber === seatsInfo.seat);
        if(seat){
          seat.status = SeatStatus.OCCUPIED;
        }

      }
    })
  }

  private generateSeats(rowCount: number, seatsPerSide: number) {
    let seatId = 1;
    for (let i = 0; i < rowCount; i++) {
      const row = [];

      for (let j = 0; j < seatsPerSide; j++) {
        row.push({
          id: seatId++,
          status: SeatStatus.AVAILABLE,
          rowNumber: i + 1,
          seatNumber: j + 1,
        });
      }

      row.push({
        id: -1,
        status: SeatStatus.CORRIDOR,
        rowNumber: i + 1,
        seatNumber: -1,
      });

      for (let j = 0; j < seatsPerSide; j++) {
        row.push({
          id: seatId++,
          status: SeatStatus.AVAILABLE,
          rowNumber: i + 1,
          seatNumber: j + seatsPerSide + 1,
        });
      }

      this.seatRows.push(row);
    }
  }
}
