import { Component, OnInit, inject } from "@angular/core";
import { InfoMovieService } from "../../core/services/info-movie.service";
import { CommonModule } from "@angular/common";
import dayjs from "dayjs";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";


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
  public readonly infoService = inject(InfoMovieService);

  public today = dayjs();
  public paymentForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.paymentForm = new FormGroup({
      name: new FormControl(null),
      cardNumber: new FormControl(null),
      expirationDate: new FormControl(null),
      cvv: new FormControl(null),
    });
  }
}
