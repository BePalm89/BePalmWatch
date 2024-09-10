import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Movie } from '../../../core/models/movie.model';
import { TvShow } from '../../../core/models/tvShow.model';
import { CommonModule } from '@angular/common';
import { MediaType } from '../../../core/models/media.model';

type MediaItem = Movie | TvShow;

@Component({
  selector: 'app-card-container',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './card-container.component.html',
  styleUrl: './card-container.component.css'
})

export class CardContainerComponent {

  @Input() data: MediaItem[] = [];
  @Input() type!: MediaType;  
}
