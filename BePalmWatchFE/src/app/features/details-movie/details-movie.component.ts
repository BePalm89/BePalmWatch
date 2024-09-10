import { Component, Input, inject } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsCardComponent } from '../../shared/ui/details-card/details-card.component';
import { MediaType } from '../../core/models/media.model';

@Component({
  selector: 'app-details-movie',
  standalone: true,
  imports: [DetailsCardComponent],
  templateUrl: './details-movie.component.html',
  styleUrl: './details-movie.component.css'
})
export class DetailsMovieComponent {

  private readonly movieService = inject(MoviesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  
  public readonly id = Number(this.route.snapshot.paramMap.get('id'));
  public movieDetails: any | null = null;
  public type = '';


  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.type = navigation?.extras.state?.['type'] ?? ''

    this.movieService.getDetailsMovie(this.id).subscribe(data => {
      const genresName = data.genres.map((genre: any) => genre.name);
      this.movieDetails = {
        ...data,
        genres: genresName,
        original_language: this.getLanguageName(data.original_language)
      }
    });
  }

  public getLanguageName(languageCode: string) {
    const displayName = new Intl.DisplayNames(['en'], { type: 'language'});
    return displayName.of(languageCode) || languageCode;
  }

}
