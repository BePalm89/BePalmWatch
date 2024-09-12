import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  inject,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTabChangeEvent, MatTabsModule } from "@angular/material/tabs";
import dayjs from "dayjs";
import { SeatAreaComponent } from "../../shared/ui/seat-area/seat-area.component";
import { SeatLegendComponent } from "../../shared/ui/seat-legend/seat-legend.component";
import { SelectedSeatsComponent } from "../../shared/ui/selected-seats/selected-seats.component";
import { HourSelectorComponent } from "../../shared/ui/hour-selector/hour-selector.component";
import { InfoMovieService } from "../../core/services/info-movie.service";
import { CommonModule } from "@angular/common";
import { Seat } from "../../core/models/seat.model";
import { convertDate } from "../../shared/utility/utils";
import { SeatStatus } from "../../core/enum/seat-status.enum";
import { SeatService } from "../../core/services/seat.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-book-a-seat",
  standalone: true,
  imports: [
    MatButtonModule,
    MatTabsModule,
    SeatAreaComponent,
    SeatLegendComponent,
    SelectedSeatsComponent,
    HourSelectorComponent,
    CommonModule,
  ],
  templateUrl: "./book-a-seat.component.html",
  styleUrl: "./book-a-seat.component.css",
})
export class BookASeatComponent implements AfterViewInit {
  private readonly infoService = inject(InfoMovieService);
  private readonly seatService = inject(SeatService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  @Input() data!: any;

  public days: { label: string; content: Seat[] }[] = [];
  public ticketsPerDayAndTime: Seat[] = [];
  public time = "";
  public HOURS: string[] = ["16:00", "18:00", "20:00", "22:00"];
  public date = '';

  constructor() {}

  ngAfterViewInit(): void {
    this.generateDays();
    this.infoService
      .getTime()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((time) => {
        this.time = time;
        this.date = this.date ? this.date : this.infoService.getDay();
        this.cd.detectChanges();
        this.updateTicketsPerDayAndTime(this.date);
        this.updateSelectedDayContent(this.date);
      });
    this.cd.detectChanges();
  }

  public selectedTabValue(event: MatTabChangeEvent) {
    this.date = event.tab.textLabel;
    const dateLabel = event.tab.textLabel;
    this.infoService.setDay(dateLabel);

    this.updateTicketsPerDayAndTime(dateLabel);
    this.updateSelectedDayContent(dateLabel);

    this.cd.detectChanges();
  }

  private generateDays() {
    const numberOfDays = 5;

    for (let i = 0; i < numberOfDays; i++) {
      const day = dayjs().add(i, "day");
      const dayLabel = day.format("ddd, DD/MM");

      this.days.push({
        label: dayLabel,
        content: [],
      });
    }
  }

  private updateTicketsPerDayAndTime(selectedDayLabel: string) {
    const formattedDate = convertDate(selectedDayLabel);

    const showtimePerSelectedDate = this.data?.showtime.find(
      (showtime: any) => showtime.date === formattedDate
    );
    const showtimePerSelectedTime = showtimePerSelectedDate?.times.find(
      (showtime: any) => showtime.time === this.time
    );

    this.ticketsPerDayAndTime = showtimePerSelectedTime?.tickets || [];

    const ticketsWithStatus = this.ticketsPerDayAndTime.map((ticket) => ({
      ...ticket,
      status: SeatStatus.OCCUPIED,
    }));

    this.seatService.setOccupiedSeats(ticketsWithStatus);
  }

  private updateSelectedDayContent(selectedDayLabel: string) {
    const selectedDay = this.days.find((day) => day.label === selectedDayLabel);
    if (selectedDay) {
      selectedDay.content = this.ticketsPerDayAndTime.map((ticket) => ({
        ...ticket,
        status: SeatStatus.OCCUPIED,
      }));
    }
  }
}
