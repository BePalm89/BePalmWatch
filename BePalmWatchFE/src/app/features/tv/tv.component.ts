import { Component, inject } from '@angular/core';
import { TvService } from '../../core/services/tv.service';
import { CardContainerComponent } from '../../shared/ui/card-container/card-container.component';
import { GenreService } from '../../core/services/genre.service';
import { mapMediaWithGenres } from '../../shared/utility/utils';
import { MediaTypeEnum } from '../../core/enum/media-type.enum';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [CardContainerComponent],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.css',
})
export class TvComponent {
  private readonly tvService = inject(TvService);
  private readonly genreService = inject(GenreService);

  tvShows: any[] = [];
  mediaType = MediaTypeEnum;

  constructor() {
    const mappedGenres = this.genreService.getGenreTvShow();

    this.tvService.getTVShows().subscribe((resp) => {
      this.tvShows = mapMediaWithGenres(resp.results, mappedGenres);
    });
  }
}
