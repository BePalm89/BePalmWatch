import { Component, DestroyRef, OnInit, inject } from "@angular/core";
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
import { convertDate } from "../../utility/utils";
import { ActivatedRoute } from "@angular/router";

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
export class DialogSliderComponent implements OnInit {
  private readonly seatService = inject(SeatService);
  private readonly nowPlayingService = inject(NowPlayingService);
  private readonly infoService = inject(InfoMovieService);
  private readonly dialogRef = inject(MatDialogRef<DialogSliderComponent>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  public readonly movieId = inject(MAT_DIALOG_DATA);

  public currentStep = 1;
  public seats: Seat[] = [];
  public time = '';
  data!: any;

  constructor() {
    this.seatService
      .getSelectedSeats()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((seat) => {
        this.seats = seat;
      });
  }

  ngOnInit(): void {
    this.nowPlayingService.getNowPlayingMovieById(this.movieId).subscribe(movie => {
      this.data = movie;
    })
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
    const formattedDate = convertDate(date);
    this.infoService.getTime().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(time => {
      this.time = time;
    })

    return {
      showtime: [
        {
          date: formattedDate,
          times: [
            {
              time: this.time,
              tickets: this.seats,
            },
          ],
        },
      ],
    };
  }
}
