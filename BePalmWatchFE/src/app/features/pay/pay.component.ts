import { Component, DestroyRef, EventEmitter, OnInit, Output, inject } from "@angular/core";
import { InfoMovieService } from "../../core/services/info-movie.service";
import { CommonModule } from "@angular/common";
import dayjs from "dayjs";
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from "@angular/material/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

interface PaymentForm  {
  name: FormControl<string | null>,
  cardNumber: FormControl<number | null>,
  expirationDate: FormControl<Date | null>,
  cvv: FormControl<number | null>
}

@Component({
  selector: "app-pay",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./pay.component.html",
  styleUrl: "./pay.component.css",
})
export class PayComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  public readonly infoService = inject(InfoMovieService);

  @Output() formValid = new EventEmitter<boolean>();

  public today = dayjs();
  public paymentForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
    this.handleFormValid();
  }

  private createForm() {
    this.paymentForm = new FormGroup<PaymentForm>({
      name: new FormControl(null, [Validators.required]),
      cardNumber: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      cvv: new FormControl(null, [Validators.required]),
    });
  };

  private handleFormValid() {
    this.paymentForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.formValid.emit(this.paymentForm.valid);
    })
  }
}
