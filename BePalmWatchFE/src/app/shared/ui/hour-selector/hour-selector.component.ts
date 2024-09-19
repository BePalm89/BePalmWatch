import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ShowtimeService } from '../../../core/services/showtime.service';

@Component({
  selector: 'app-hour-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hour-selector.component.html',
  styleUrl: './hour-selector.component.css'
})
export class HourSelectorComponent {

  @Input() selectedHour: string;
  private readonly showtimeService = inject(ShowtimeService);

  public HOURS: string[] = ['16:00', '18:00', '20:00', '22:00'];

  constructor() {
    this.selectedHour = this.HOURS[0];
  }

  public isSelected(hour: string) {
    return this.selectedHour === hour;
  }

  public onSelectHour(hour : string) {
    this.selectedHour = hour;
    this.showtimeService.updateTime(hour);
  }

}
