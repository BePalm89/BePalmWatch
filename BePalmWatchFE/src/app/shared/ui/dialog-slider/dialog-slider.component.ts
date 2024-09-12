import { Component, DestroyRef, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
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

@Component({
  selector: "app-dialog-slider",
  standalone: true,
  imports: [
    MatDialogModule,
    BookASeatComponent,
    MatButtonModule,
    CommonModule,
    ReviewTicketsComponent,
    PayComponent
  ],
  templateUrl: "./dialog-slider.component.html",
  styleUrl: "./dialog-slider.component.css",
})
export class DialogSliderComponent {
  private readonly dialogRef = inject(MatDialogRef<DialogSliderComponent>);
  private readonly seatService = inject(SeatService);
  private readonly destroyRef = inject(DestroyRef);
  public readonly data = inject(MAT_DIALOG_DATA);

  public currentStep = 1;
  public seats: Seat[] = [];

  constructor() {
    this.seatService.getSelectedSeats().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(seat => {
      this.seats = seat;
    })
  }

  public onNextStep(): void {
    this.currentStep++;
  }

  public onPrevStep(): void {
    this.currentStep--;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
