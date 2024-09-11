import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InfoMovieService } from '../../../core/services/info-movie.service';

@Component({
  selector: 'app-hour-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hour-selector.component.html',
  styleUrl: './hour-selector.component.css'
})
export class HourSelectorComponent {

  private readonly infoService = inject(InfoMovieService);

  public HOURS: string[] = ['16:00', '18:00', '20:00', '22:00'];
  public selectedHour = this.HOURS[0];

  constructor () {
  }

  public isSelected(hour: string) {
    return this.selectedHour === hour;
  }

  public onSelectHour(hour : string) {
    this.selectedHour = hour;
    this.infoService.setTime(hour);
  }

}
