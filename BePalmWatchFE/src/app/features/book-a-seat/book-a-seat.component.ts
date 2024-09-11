import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import dayjs from 'dayjs';
import { SeatAreaComponent } from '../../shared/ui/seat-area/seat-area.component';
import { SeatLegendComponent } from '../../shared/ui/seat-legend/seat-legend.component';
import { SelectedSeatsComponent } from '../../shared/ui/selected-seats/selected-seats.component';

@Component({
  selector: 'app-book-a-seat',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTabsModule,
    SeatAreaComponent,
    SeatLegendComponent,
    SelectedSeatsComponent
  ],
  templateUrl: './book-a-seat.component.html',
  styleUrl: './book-a-seat.component.css',
})
export class BookASeatComponent {
  public days: { label: string; content: string }[] = [];

  public HOURS: string[] = ['16:00', '18:00', '20:00', '22:00'];

  constructor() {
    this.generateDays();
  }

  private generateDays() {
    const numberOfDays = 5;

    for (let i = 0; i < numberOfDays; i++) {
      const day = dayjs().add(i, 'day');
      const dayLabel = day.format('ddd, DD/MM');
      const dayContent = this.getContentForDay(i);

      this.days.push({
        label: dayLabel,
        content: dayContent,
      });
    }
  }

  getContentForDay(dayIndex: number): string {
    switch (dayIndex) {
      case 0:
        return 'Content for Today';
      case 1:
        return 'Content for Tomorrow';
      case 2:
        return 'Content for Day 3';
      case 3:
        return 'Content for Day 4';
      case 4:
        return 'Content for Day 5';
      default:
        return 'Content for another day';
    }
  }
}
