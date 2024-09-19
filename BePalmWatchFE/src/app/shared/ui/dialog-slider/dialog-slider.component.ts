import { Component, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { BookASeatComponent } from "../../../features/book-a-seat/book-a-seat.component";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { ReviewTicketsComponent } from "../../../features/review-tickets/review-tickets.component";
import { PayComponent } from "../../../features/pay/pay.component";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { BehaviorSubject } from "rxjs";

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

  private readonly dialogRef = inject(MatDialogRef<DialogSliderComponent>);
  public readonly movieData = inject(MAT_DIALOG_DATA);

  public currentStep = 1;
  public isFormValid = false;
  public readyToPay = new BehaviorSubject<boolean>(false);
  public canGoToReviewPage = false;

  public onNextStep(): void {
      this.currentStep++;
  }

  public updateMovieAndPay(): void {
    this.readyToPay.next(true);
  }

  public onPrevStep(): void {
    this.currentStep--;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onFormValid(valid: boolean) {
    this.isFormValid = valid;
  }

  public onHasSelectedSeat(event: boolean) {
    this.canGoToReviewPage = event;
  }
}
