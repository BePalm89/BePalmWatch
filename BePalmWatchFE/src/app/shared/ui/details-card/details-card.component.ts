import { Component, Input, inject } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { SeatService } from '../../../core/services/seat.service';
import { MediaTypeEnum } from '../../../core/enum/media-type.enum';
import { DialogSliderComponent } from '../dialog-slider/dialog-slider.component';
import { ActivatedRoute } from '@angular/router';
import { InfoMovieService } from '../../../core/services/info-movie.service';

@Component({
  selector: 'app-details-card',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.css'
})
export class DetailsCardComponent {

  private readonly seatService = inject(SeatService);
  private readonly infoService = inject(InfoMovieService);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);

  @Input() movieDetails!: Movie | null;
  @Input() type = '';

  mediaType: typeof MediaTypeEnum = MediaTypeEnum


  public openBookSeatModal() {

    const dialogRef = this.dialog.open(DialogSliderComponent, {
      data: this.route.snapshot.paramMap.get('id'),
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.seatService.clearSelectedSeats();
      this.seatService.clearOccupiedSeats();
      this.infoService.resetTime();
    })
  }
}
