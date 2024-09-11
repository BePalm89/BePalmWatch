import { Component, inject } from "@angular/core";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { BookASeatComponent } from "../../../features/book-a-seat/book-a-seat.component";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { ɵBrowserAnimationBuilder } from "@angular/animations";
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: "app-dialog-slider",
  standalone: true,
  imports: [MatDialogModule, BookASeatComponent, MatButtonModule, CommonModule],
  templateUrl: "./dialog-slider.component.html",
  styleUrl: "./dialog-slider.component.css",
})
export class DialogSliderComponent {

  private readonly dialogRef = inject(MatDialogRef<DialogSliderComponent>);

  public currentStep = 1;

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
