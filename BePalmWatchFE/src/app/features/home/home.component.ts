import { Component, inject } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { CardComponent } from '../../shared/ui/card/card.component';
import { CommonModule } from '@angular/common';
import { Movie } from '../../core/models/movie.model';
import { CardContainerComponent } from '../../shared/ui/card-container/card-container.component';
import { GenreService } from '../../core/services/genre.service';
import { mapMediaWithGenres } from '../../shared/utility/utils';
import { MediaTypeEnum } from '../../core/enum/media-type.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
  private readonly movieService = inject(MoviesService);
  private readonly genreService = inject(GenreService);
  
  movies: any[] = [];
  mediaType = MediaTypeEnum;

  constructor() {
    const mappedGenres = this.genreService.getGenreMovie();
    this.movieService.getMovies().subscribe((resp) => {
      this.movies = mapMediaWithGenres(resp.results, mappedGenres);
    });
  }
}
