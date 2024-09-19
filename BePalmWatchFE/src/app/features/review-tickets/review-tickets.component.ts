import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, DestroyRef, Input, OnInit, inject } from "@angular/core";
import { getImageUrl } from "../../shared/utility/utils";
import { MatTableModule } from "@angular/material/table";
import { Seat } from "../../core/models/seat.model";
import { ShowtimeService } from "../../core/services/showtime.service";
import { Ticket } from "../../core/models/showtime.model";

@Component({
  selector: "app-review-tickets",
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: "./review-tickets.component.html",
  styleUrl: "./review-tickets.component.css",
})
export class ReviewTicketsComponent implements OnInit {

  public readonly showtimeService = inject(ShowtimeService);
  private readonly cd = inject(ChangeDetectorRef);

  @Input() data!: any;
  day!: string;
  displayedColumns: string[] = ["seats", "price"];
  tickets: Ticket[] = [];
  pricePerTicket!: number;

  ngOnInit(): void {
    this.tickets = this.showtimeService.getTicket();
    this.cd.detectChanges();
  };

  public getImageUrl(path: string, size: string) {
    return getImageUrl(path, size);
  }

  public getLanguageName(languageCode: string) {
    const displayName = new Intl.DisplayNames(["en"], { type: "language" });
    return displayName.of(languageCode) || languageCode;
  }

  public getTotalCost() {
    const cost = this.tickets.reduce((acc, ticket) => acc + ticket.price, 0);
    this.showtimeService.updatePrice(cost);
    return cost;
  }
}
