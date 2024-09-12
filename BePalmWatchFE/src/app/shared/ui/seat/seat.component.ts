import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from "@angular/core";
import { SeatService } from "../../../core/services/seat.service";
import { Seat } from "../../../core/models/seat.model";
import { SeatStatus } from "../../../core/enum/seat-status.enum";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-seat",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./seat.component.html",
  styleUrl: "./seat.component.css",
})
export class SeatComponent implements AfterViewInit {
  private readonly seatService = inject(SeatService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cd = inject(ChangeDetectorRef);

  @Input() color: string = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--free-color");
  @Input() row: number = 0;
  @Input() seat: number = 0;

  public seatStatus: SeatStatus = SeatStatus.AVAILABLE;
  public isOccupied = false;
  public isSelected = false;

  ngAfterViewInit(): void {
    this.handleOccupiedSeats();
    this.handleSelectedSeats();
  }

  public selectSeat() {

    if(this.isOccupied) return;

    const selectedSeat: Seat = {
      row: this.row,
      seat: this.seat,
      status: this.seatStatus,
    };

    this.seatService.selectSeat(selectedSeat);

    this.handleSelectedSeats();
  }

  private updateColor() {
    if(this.isOccupied) {
      this.color = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--occupied-color");
    } else if ( this.isSelected) {
      this.color = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--tertiary-color");
    } else {
      this.color = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--free-color");
    }
/*     switch (status) {
      case SeatStatus.AVAILABLE:
        this.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--free-color");
        break;
      case SeatStatus.SELECTED:
        this.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--tertiary-color");
        break;
      case SeatStatus.OCCUPIED:
        this.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--occupied-color");

        break;
      default:
        this.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--free-color");
        break; 
    }*/
  };

  private handleOccupiedSeats() {
    this.seatService
      .getOccupiedSeats()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const seat = value.find(
          (s) => s.row === this.row && s.seat === this.seat
        );
        this.isOccupied = !!seat;
        this.updateColor();
        this.cd.detectChanges();
      });
  };

  private handleSelectedSeats() {
    this.seatService
    .getSelectedSeats()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((selectedSeat) => {
      const seat = selectedSeat.find(
        (s) => s.row === this.row && s.seat === this.seat && s.status !== SeatStatus.OCCUPIED
      );
      this.isSelected = !!seat;
      this.updateColor();
      this.cd.detectChanges();
    });
  }
}
