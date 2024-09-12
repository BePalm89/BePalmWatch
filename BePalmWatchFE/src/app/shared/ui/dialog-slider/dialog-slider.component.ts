import { Component, DestroyRef, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { BookASeatComponent } from "../../../features/book-a-seat/book-a-seat.component";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { ɵBrowserAnimationBuilder } from "@angular/animations";
import { BrowserModule } from "@angular/platform-browser";
import { ReviewTicketsComponent } from "../../../features/review-tickets/review-tickets.component";
import { SeatService } from "../../../core/services/seat.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Seat } from "../../../core/models/seat.model";
import { PayComponent } from "../../../features/pay/pay.component";
import { NowPlayingService } from "../../../core/services/now-playing.service";
import { InfoMovieService } from "../../../core/services/info-movie.service";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);
@Component({
  selector: "app-dialog-slider",
  standalone: true,
  imports: [
    MatDialogModule,
    BookASeatComponent,
    MatButtonModule,
    CommonModule,
    ReviewTicketsComponent,
    PayComponent,
  ],
  templateUrl: "./dialog-slider.component.html",
  styleUrl: "./dialog-slider.component.css",
})
export class DialogSliderComponent {
  private readonly seatService = inject(SeatService);
  private readonly nowPlayingService = inject(NowPlayingService);
  private readonly infoService = inject(InfoMovieService);
  private readonly dialogRef = inject(MatDialogRef<DialogSliderComponent>);
  private readonly destroyRef = inject(DestroyRef);
  public readonly data = inject(MAT_DIALOG_DATA);

  public currentStep = 1;
  public seats: Seat[] = [];

  constructor() {
    this.seatService
      .getSelectedSeats()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((seat) => {
        this.seats = seat;
      });
  }

  public onNextStep(): void {
    if (this.currentStep === 3) {
      const { _id } = this.data;

      const payload = this.createPayload();

      this.nowPlayingService
        .updateNowPlayingMovie(_id, payload)
        .subscribe(() => this.dialogRef.close());
    } else {
      this.currentStep++;
    }
  }

  public onPrevStep(): void {
    this.currentStep--;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  private createPayload() {
    const date = this.infoService.getDay();
    const formattedDate = this.convertDate(date);

    return {
      showtime: [
        {
          date: formattedDate,
          times: [
            {
              time: this.infoService.getTime(),
              tickets: this.seats,
            },
          ],
        },
      ],
    };
  }

  private convertDate(date: string): string {
    const inputFormat = "ddd, DD.MM";
    const outputFormat = "YYYY-MM-DD";
    const year = 2024;
    const dateString = `${date} ${year}`;

    const parsedDate = dayjs(dateString, `${inputFormat} YYYY`);

    if (!parsedDate.isValid()) {
      throw new Error("Invalid date format");
    }

    return parsedDate.format(outputFormat);
  }
}
