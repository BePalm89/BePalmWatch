import { Component, Input, inject } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { MatCardModule } from '@angular/material/card';
import { YearPipe } from '../../pipes/year.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { MoviesService } from '../../../core/services/movies.service';
import { TvShow } from '../../../core/models/tvShow.model';
import { TvService } from '../../../core/services/tv.service';
import { RouterModule } from '@angular/router';
import { getImageUrl } from '../../utility/utils';
import { MediaType } from '../../../core/models/media.model';
import { MediaTypeEnum } from '../../../core/enum/media-type.enum';

type MediaItem = Movie | TvShow;

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, YearPipe, MatDividerModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private readonly movieService = inject(MoviesService);
  private readonly tvShowService = inject(TvService);

  @Input() data!: MediaItem;
  @Input() type!: MediaType;

  private isFavorite = false;

  get title(): string {
    return this.type === MediaTypeEnum.MOVIE || this.type === MediaTypeEnum.NOW_PLAYING
      ? (this.data as Movie).title
      : (this.data as TvShow).name;
  }

  get releaseYear(): string {
    return this.type === MediaTypeEnum.MOVIE || this.type === MediaTypeEnum.NOW_PLAYING
      ? (this.data as Movie).release_date
      : (this.data as TvShow).first_air_date;
  }

  public getImageUrl(path: string) {
    return getImageUrl(path);
  }

  public getFavoriteIcon(): string {
    return this.isFavorite
      ? '/assets/icons/like-fill.png'
      : '/assets/icons/like.png';
  }

  public toggleFavorite(id: number) {
    this.isFavorite = !this.isFavorite;

    if (this.type === MediaTypeEnum.MOVIE || this.type === MediaTypeEnum.NOW_PLAYING) {
      this.movieService
        .addFavorite({
          media_type: 'movie',
          media_id: id,
          favorite: this.isFavorite,
        })
        .subscribe(() => console.log('success movie'));
    } else {
      this.tvShowService
        .addFavorite({
          media_type: 'tv',
          media_id: id,
          favorite: this.isFavorite,
        })
        .subscribe(() => console.log('success tv'));
    }
  }
}
