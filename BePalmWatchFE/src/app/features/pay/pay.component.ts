import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import dayjs from "dayjs";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerModule,
} from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
import { NowPlayingService } from "../../core/services/now-playing.service";
import { MatDialogRef } from "@angular/material/dialog";
import { DialogSliderComponent } from "../../shared/ui/dialog-slider/dialog-slider.component";
import { ShowtimeService } from "../../core/services/showtime.service";
import { Showtime } from "../../core/models/showtime.model";
import { Router } from "@angular/router";
import { maxNumberOfDigit } from "../../core/validations/custom-validator.directive";
import { convertDate, formattedCardNumber } from "../../shared/utility/utils";
import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from "moment";
import { MomentDateAdapter } from "@angular/material-moment-adapter";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

interface PaymentForm {
  name: FormControl<string | null>;
  cardNumber: FormControl<string | null>;
  expirationDate: FormControl<Moment | null>;
  cvv: FormControl<number | null>;
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
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  templateUrl: "./pay.component.html",
  styleUrl: "./pay.component.css",
})
export class PayComponent implements OnInit {
  public readonly nowPlayingService = inject(NowPlayingService);
  public readonly showtimeService = inject(ShowtimeService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogRef = inject(MatDialogRef<DialogSliderComponent>);
  private readonly route = inject(Router);

  @Output() formValid = new EventEmitter<boolean>();
  @Input() readyToPay = new BehaviorSubject<boolean>(false);
  @Input() movieData!: any;
  @Input() showtime!: Showtime;

  public today = dayjs();
  public paymentForm!: FormGroup;
  public minDate = moment();

  ngOnInit(): void {
    this.createForm();
    this.handleFormValid();
    this.handlePayment();
    this.handleCardNumberFormatter();
  }

  public setMonthAndYear(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.paymentForm.get("expirationDate")?.value;
    ctrlValue.month(normalizedMonth.month());
    this.paymentForm.get("expirationDate")?.setValue(ctrlValue);
    datepicker.close();
  }

  public chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.paymentForm.get("expirationDate")?.value;
    ctrlValue?.year(normalizedYear.year());
    this.paymentForm.get("expirationDate")?.setValue(ctrlValue);
  }

  private createForm() {
    this.paymentForm = new FormGroup<PaymentForm>({
      name: new FormControl(null, [Validators.required]),
      cardNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9 ]{19}$/),
      ]),
      expirationDate: new FormControl(moment(), [Validators.required]),
      cvv: new FormControl(null, [Validators.required, maxNumberOfDigit(3)]),
    });
  }

  private handleCardNumberFormatter() {
    this.paymentForm
      .get("cardNumber")
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          const formattedValue = formattedCardNumber(value);
          this.paymentForm
            .get("cardNumber")
            ?.setValue(formattedValue, { emitEvent: false });
        }
      });
  }

  private handleFormValid() {
    this.paymentForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.formValid.emit(this.paymentForm.valid);
      });
  }

  private handlePayment() {
    this.readyToPay
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isReadyToPay) => {
        if (isReadyToPay) {
          const { _id } = this.movieData;

          const payload = this.createPayload();

          this.nowPlayingService
            .updateNowPlayingMovie(_id, payload)
            .subscribe(() => {
              this.dialogRef.close();

              this.route.navigate(["/now-playing"]);
            });
        }
      });
  }

  private createPayload() {
    const { date, time } = this.showtimeService.getShowtime();
    const tickets = this.showtimeService.getTicket();

    const seats = tickets.map((t) => {
      return {
        seat: t.seat,
        row: t.row,
      };
    });

    const formattedDate = convertDate(date);

    return {
      showtime: [
        {
          date: formattedDate,
          times: [
            {
              time: time,
              tickets: seats,
            },
          ],
        },
      ],
    };
  }
}
