import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SeatComponent } from "../seat/seat.component";
import { SeatStatus } from "../../../core/enum/seat-status.enum";
import { Seat } from "../../../core/models/seat.model";
import { ShowtimeService } from "../../../core/services/showtime.service";
import { BehaviorSubject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-seat-area",
  standalone: true,
  imports: [CommonModule, SeatComponent, FormsModule],
  templateUrl: "./seat-area.component.html",
  styleUrl: "./seat-area.component.css",
})
export class SeatAreaComponent implements OnInit, OnChanges {

  private readonly snackbar = inject(MatSnackBar);

  @Input() occupiedSeats = new BehaviorSubject<Seat[]>([]);
  @Input() selectedSeatsList: Seat[] = [];
  @Output() selectedSeatsListChange = new EventEmitter<Seat[]>();


  public readonly ROWS_NUMBER = 11;
  public readonly SEAT_NUMBER_PER_ROW = 5;

  seatRows: Seat[][] = [];

  ngOnInit(): void {
    this.generateSeats(this.ROWS_NUMBER, this.SEAT_NUMBER_PER_ROW);
    this.markOccupiedSeats();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedSeatsList']) {
      this.clearSelectedSeats();
      this.handleStatusSeat(changes['selectedSeatsList'].currentValue, SeatStatus.SELECTED);
    }
  }
  
  public onSelectedSeat(seatId: number) {
    
    const seat = this.findSeatById(seatId);
    if(!seat) return;

    if(this.hasReachSeatLimit() && seat.status === SeatStatus.AVAILABLE) {
      this.showSeatLimitWarning();
      return;
    }

    this.toggleSeatSelection(seat);

   this.selectedSeatsListChange.emit(this.selectedSeatsList);
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
    this.occupiedSeats.asObservable().subscribe(value => {
      this.clearOccupiedSeats();
      this.handleStatusSeat(value, SeatStatus.OCCUPIED);
    });
  }

  private generateSeats(rowCount: number, seatsPerSide: number) {
    let seatId = 1;
    for (let i = 0; i < rowCount; i++) {
      const row: Seat[] = [];

      for (let j = 0; j < seatsPerSide; j++) {
        row.push({
          id: seatId++,
          status: SeatStatus.AVAILABLE,
          row: i + 1,
          seat: j + 1,
        });
      }

      row.push({
        id: -1,
        status: SeatStatus.CORRIDOR,
        row: i + 1,
        seat: -1,
      });

      for (let j = 0; j < seatsPerSide; j++) {
        row.push({
          id: seatId++,
          status: SeatStatus.AVAILABLE,
          row: i + 1,
          seat: j + seatsPerSide + 1,
        });
      }

      this.seatRows.push(row);
    }
  }

  private handleStatusSeat(seats: Seat[], status: SeatStatus) {
    for (let seatsInfo of seats) {
      const row = this.seatRows[seatsInfo.row - 1];
      const seat = row.find((s) => s.seat === seatsInfo.seat);
      if (seat) {
        seat.status = status;
      }
    }
  }

  private clearOccupiedSeats() {
    this.seatRows.flat().forEach((seat) => {
      if (seat.status === SeatStatus.OCCUPIED) {
        seat.status = SeatStatus.AVAILABLE;
      }
    });
  }

  private clearSelectedSeats() {
    this.seatRows.flat().forEach((seat) => {
      if (seat.status === SeatStatus.SELECTED) {
        seat.status = SeatStatus.AVAILABLE;
      }
    });
  };

  private findSeatById(seatId: number): Seat | undefined {
    for (let row of this.seatRows) {
      const seat = row.find(s => s.id === seatId);
      if (seat) {
        return seat;
      }
    }
    return undefined;
  };

  private hasReachSeatLimit(): boolean {
    return this.selectedSeatsList.length >=6;
  }

  private showSeatLimitWarning(): void {
    this.snackbar.open('You can only select up to 6 seats.', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  };

  private toggleSeatSelection(seat: Seat): void {
    if (seat.status === SeatStatus.AVAILABLE) {
      seat.status = SeatStatus.SELECTED;
      this.selectedSeatsList.push(seat);
    } else if (seat.status === SeatStatus.SELECTED) {
      seat.status = SeatStatus.AVAILABLE;
      this.selectedSeatsList = this.selectedSeatsList.filter(s => s.id !== seat.id);
    }
  }

}
