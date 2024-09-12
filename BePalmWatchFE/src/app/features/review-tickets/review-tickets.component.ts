import { CommonModule, CurrencyPipe } from "@angular/common";
import { Component, DestroyRef, Input, OnInit, inject } from "@angular/core";
import { getImageUrl } from "../../shared/utility/utils";
import { MatTableModule } from "@angular/material/table";
import { SeatService } from "../../core/services/seat.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Seat } from "../../core/models/seat.model";
import { InfoMovieService } from '../../core/services/info-movie.service';

@Component({
  selector: "app-review-tickets",
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: "./review-tickets.component.html",
  styleUrl: "./review-tickets.component.css",
})
export class ReviewTicketsComponent implements OnInit {
  private readonly infoService = inject(InfoMovieService);
  private readonly seatService = inject(SeatService);
  private readonly destroyRef = inject(DestroyRef);

  @Input() data!: any;
  day!: string;
  time!: string;
  displayedColumns: string[] = ["seats", "price"];
  tickets: { seat: Seat; price: number }[] = [];

  ngOnInit(): void {
    this.day = this.infoService.getDay();
    this.time = this.infoService.getTime();

    this.seatService
      .getSelectedSeats()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((seats) => {
        this.tickets = seats.map((seat) => {
          return {
            seat: seat,
            price: 9.5,
          };
        });
      });
  }

  public getImageUrl(path: string, size: string) {
    return getImageUrl(path, size);
  }

  public getLanguageName(languageCode: string) {
    const displayName = new Intl.DisplayNames(["en"], { type: "language" });
    return displayName.of(languageCode) || languageCode;
  }

  public getTotalCost() {
    const cost = this.tickets.reduce((acc, ticket) => acc + ticket.price, 0);
    this.infoService.setCost(cost);
    return cost;
  }
}
