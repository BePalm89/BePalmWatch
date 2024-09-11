import { Component, Input, inject } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { CommonModule } from '@angular/common';
import { getImageUrl } from '../../utility/utils';
import { MatButton } from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { BookASeatComponent } from '../../../features/book-a-seat/book-a-seat.component';
import { SeatService } from '../../../core/services/seat.service';
import { MediaTypeEnum } from '../../../core/enum/media-type.enum';

@Component({
  selector: 'app-details-card',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.css'
})
export class DetailsCardComponent {

  private readonly dialog = inject(MatDialog);
  private readonly seatService = inject(SeatService);

  @Input() movieDetails!: Movie | null;
  @Input() type = '';

  mediaType: typeof MediaTypeEnum = MediaTypeEnum

  public imgUrl = '';

  public getImageUrl(path: string) {
    return getImageUrl(path);
  }

  public openBookSeatModal() {
    const dialogRef = this.dialog.open(BookASeatComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.seatService.clearSelectedSeats();
    })
  }
}
