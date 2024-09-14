import { Component } from "@angular/core";
import { SeatComponent } from "../seat/seat.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-seat-legend",
  standalone: true,
  imports: [SeatComponent, CommonModule],
  templateUrl: "./seat-legend.component.html",
  styleUrl: "./seat-legend.component.css",
})
export class SeatLegendComponent {
  
  public readonly LEGEND_SEAT = [
    { label: "Available", color: getComputedStyle(document.documentElement).getPropertyValue(
      "--free-color"
    ) },
    { label: "Occupied", color: getComputedStyle(document.documentElement).getPropertyValue(
      "--occupied-color") },
    { label: "Selected", color: getComputedStyle(document.documentElement).getPropertyValue(
      "--tertiary-color"
    ) },
  ];
}
