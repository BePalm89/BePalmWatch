import { Component, Input, inject } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MediaTypeEnum } from '../../../core/enum/media-type.enum';
import { DialogSliderComponent } from '../dialog-slider/dialog-slider.component';
import { ShowtimeService } from '../../../core/services/showtime.service';

@Component({
  selector: 'app-details-card',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.css'
})
export class DetailsCardComponent {

  private readonly showtimeService = inject(ShowtimeService);
  private readonly dialog = inject(MatDialog);

  @Input() movieDetails!: Movie | null;
  @Input() type = '';

  mediaType: typeof MediaTypeEnum = MediaTypeEnum


  public openBookSeatModal() {

    const dialogRef = this.dialog.open(DialogSliderComponent, {
      data: this.movieDetails
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.showtimeService.resetShowtime();
      this.showtimeService.resetTickets();
    })
  }
}
