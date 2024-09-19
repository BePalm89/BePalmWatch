import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  Output,
  ViewChild,
  inject,
  EventEmitter
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MatTabChangeEvent,
  MatTabGroup,
  MatTabsModule,
} from "@angular/material/tabs";
import dayjs from "dayjs";
import { SeatAreaComponent } from "../../shared/ui/seat-area/seat-area.component";
import { SeatLegendComponent } from "../../shared/ui/seat-legend/seat-legend.component";
import { SelectedSeatsComponent } from "../../shared/ui/selected-seats/selected-seats.component";
import { HourSelectorComponent } from "../../shared/ui/hour-selector/hour-selector.component";
import { CommonModule } from "@angular/common";
import { Seat } from "../../core/models/seat.model";
import { convertDate } from "../../shared/utility/utils";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ShowtimeService } from "../../core/services/showtime.service";
import { Showtime, Ticket } from "../../core/models/showtime.model";
import { BehaviorSubject, distinctUntilChanged, map } from "rxjs";


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
  public readonly showtimeService = inject(ShowtimeService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild("tabGroup") tabGroup!: MatTabGroup;
  @Input() data!: any;
  @Output() hasSelectedSeat = new EventEmitter<boolean>(false);

  public tabTitles: string[] = [];
  public HOURS: string[] = ["16:00", "18:00", "20:00", "22:00"];
  public occupiedSeats = new BehaviorSubject<Seat[]>([]);
  public selectedSeatsList: Seat[] = [];

  constructor() {
    this.generateDays();
  }

  ngAfterViewInit(): void {
    this.selectTabForDate();

    this.showtimeService
      .getShowtimeSubject()
      .pipe(
        map((showtime) => ({ date: showtime.date, time: showtime.time })),
        distinctUntilChanged(
          (prev, curr) => prev.date === curr.date && prev.time === curr.time
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((showtime) => {

        const tickets = this.showtimeService.getTicket();
        const hasAllTicketTheSameDateAndTimeSet = tickets.every(t => t.date === showtime.date && t.time === showtime.time);

        if(!hasAllTicketTheSameDateAndTimeSet) {
          this.selectedSeatsList = [];
          this.showtimeService.setSelectedSeat([]);
          this.hasSelectedSeat.emit(false);
        } else if (tickets.length){
          this.selectedSeatsList = this.showtimeService.getTicket();
          this.hasSelectedSeat.emit(true);
        }
        
        this.updateOccupiedSeatPerDateAndTime(showtime.date, showtime.time);
      });
  }


  public selectedTabValue(event: MatTabChangeEvent) {
    const dateLabel = event.tab.textLabel;

    this.showtimeService.updateDate(dateLabel);

    this.cd.detectChanges();
  }

  public onSelectedSeatChange(selectedSeat: Seat[]) {
    const tickets: Ticket[] = selectedSeat.map((seat: any) => {
      return {
        ...seat,
        time: this.showtimeService.getShowtime().time,
        date: this.showtimeService.getShowtime().date,
        price: 9.50
      };
    });

    if(tickets.length) {
      this.hasSelectedSeat.emit(true);
    } else {
      this.hasSelectedSeat.emit(false);
    }
    this.showtimeService.setSelectedSeat(tickets);
  }

  private updateOccupiedSeatPerDateAndTime(date: string, time: string) {
    const formattedDate = convertDate(date);

    const showtimePerSelectedDate = this.data?.showtime.find(
      (showtime: any) => showtime.date === formattedDate
    );

    const showtimePerSelectedTime = showtimePerSelectedDate?.times.find(
      (showtime: any) => showtime.time === time
    );

    this.occupiedSeats.next(showtimePerSelectedTime?.tickets || []);

    this.cd.detectChanges();
  }

  private generateDays() {
    const numberOfDays = 5;

    for (let i = 0; i < numberOfDays; i++) {
      const day = dayjs().add(i, "day");
      const dayLabel = day.format("ddd, DD/MM");

      this.tabTitles.push(dayLabel);
    }
  }

  private selectTabForDate() {
    const { date } = this.showtimeService.getShowtime();
    if (this.tabGroup && this.tabTitles.length) {
      const index = this.tabTitles.indexOf(date);
      if (index !== -1) {
        this.tabGroup.selectedIndex = index;
      }
    }
  }
}
