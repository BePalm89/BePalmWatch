import { Component, inject } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { GenreService } from '../../core/services/genre.service';
import { mapMediaWithGenres } from '../../shared/utility/utils';
import { CardContainerComponent } from '../../shared/ui/card-container/card-container.component';
import { forkJoin } from 'rxjs';
import { TvService } from '../../core/services/tv.service';
import { MediaTypeEnum } from '../../core/enum/media-type.enum';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CardContainerComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {

  private readonly movieService = inject(MoviesService);
  private readonly genreService = inject(GenreService);
  private readonly tvService = inject(TvService);

  favoriteMovies: any[] = [];
  favoriteTvShow: any[] = [];
  mediaType = MediaTypeEnum;

  constructor() {
    const mappedGenreMovies = this.genreService.getGenreMovie();
    const mappedGenreTvShow = this.genreService.getGenreTvShow();

    forkJoin([
      this.movieService.getFavoriteMovies(),
      this.tvService.getFavoriteTvShow()
    ])
    .subscribe(([ favoriteMovies, favoriteTvShow]) => {
      this.favoriteMovies = mapMediaWithGenres(favoriteMovies.results, mappedGenreMovies);
      this.favoriteTvShow = mapMediaWithGenres(favoriteTvShow.results, mappedGenreTvShow);
    })
  }
}
