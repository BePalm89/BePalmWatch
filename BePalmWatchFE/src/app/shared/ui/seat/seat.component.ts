import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-seat",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./seat.component.html",
  styleUrl: "./seat.component.css",
})
export class SeatComponent  {

  @Input() public color = getComputedStyle(document.documentElement).getPropertyValue(
    "--free-color"
  );
  @Output() seatSelected = new EventEmitter<void>();

  public onSeatClick() {
    this.seatSelected.emit();
  }
}
