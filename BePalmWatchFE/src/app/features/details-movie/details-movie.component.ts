import { Component, OnInit, inject } from "@angular/core";
import { MoviesService } from "../../core/services/movies.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DetailsCardComponent } from "../../shared/ui/details-card/details-card.component";
import { MediaTypeEnum } from "../../core/enum/media-type.enum";
import { NowPlayingService } from "../../core/services/now-playing.service";
import { TvService } from "../../core/services/tv.service";

@Component({
  selector: "app-details-movie",
  standalone: true,
  imports: [DetailsCardComponent],
  templateUrl: "./details-movie.component.html",
  styleUrl: "./details-movie.component.css",
})
export class DetailsMovieComponent implements OnInit {
  private readonly movieService = inject(MoviesService);
  private readonly tvShowService = inject(TvService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly nowPlayingService = inject(NowPlayingService);

  public readonly id = Number(this.route.snapshot.paramMap.get("id"));
  public movieDetails: any | null = null;
  public type = "";

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.type = navigation?.extras.state?.["type"] ?? "";

  }
  ngOnInit(): void {
    
    if (this.type === MediaTypeEnum.NOW_PLAYING) {
      this.nowPlayingService
        .getNowPlayingMovieById(this.route.snapshot.paramMap.get("id") ?? "")
        .subscribe((resp) => {
          this.movieDetails = {
            ...resp,
            original_language: this.getLanguageName(resp.original_language),
          };
        });
    } else if (this.type === MediaTypeEnum.MOVIE) {
      this.movieService.getDetailsMovie(this.id).subscribe((data) => {
        const genresName = data.genres.map((genre: any) => genre.name);
        this.movieDetails = {
          ...data,
          genres: genresName,
          original_language: this.getLanguageName(data.original_language),
        };
      });
    } else if( this.type === MediaTypeEnum.TV_SHOW) {
      this.tvShowService.getDetailsTvShow(this.id).subscribe((data) => {
        const genresName = data.genres.map((genre: any) => genre.name);
        this.movieDetails = {
          ...data,
          title: data.name,
          release_date: data.first_air_date,
          genres: genresName,
          original_language: this.getLanguageName(data.original_language),
        };
      })
    }
  }

  public getLanguageName(languageCode: string) {
    const displayName = new Intl.DisplayNames(["en"], { type: "language" });
    return displayName.of(languageCode) ?? languageCode;
  }
}
