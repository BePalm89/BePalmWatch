import { Component, inject } from '@angular/core';
import { NowPlayingService } from '../../core/services/now-playing.service';
import { CardContainerComponent } from '../../shared/ui/card-container/card-container.component';
import { GenreService } from '../../core/services/genre.service';
import { mapMediaWithGenres } from '../../shared/utility/utils';
import { Date } from '../../core/models/date.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-now-playing',
  standalone: true,
  imports: [CardContainerComponent, CommonModule],
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.css'
})
export class NowPlayingComponent {

  private readonly nowPlayingService = inject(NowPlayingService);
  private readonly genreService = inject(GenreService);

  nowPlayingMovies: any[] = [];
  date: Date | null = null;

  constructor() {
    const mappedGenres = this.genreService.getGenreMovie();
    this.nowPlayingService.getNowPlayingMovies().subscribe((resp) => {
        this.date = resp.dates;
        this.nowPlayingMovies = mapMediaWithGenres(resp.results, mappedGenres);
    })
  }

}
