import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private readonly TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo';
  private readonly GENRE_MOVIE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
  private readonly GENRE_TVSHOW_URL = 'https://api.themoviedb.org/3/genre/tv/list';

  private readonly http = inject(HttpClient);

  private genreMapMovies: { [id: number]: string } = {};
  private genreMapTvShow: { [id: number]: string } = {};

  public fetchGenreMovies(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`,
    });

    const params = new HttpParams().set('language', 'en-US');

    return this.http.get(`${this.GENRE_MOVIE_URL}`, { headers, params });
  }

  public setGenreMovie(genreMovies: any) {
    this.genreMapMovies = genreMovies.genres.reduce(
      (acc: { [key: number]: string }, genre: any) => {
        acc[genre.id] = genre.name;
        return acc;
      },
      {}
    );
  }

  public getGenreMovie(): { [id: number]: string } {
    return this.genreMapMovies;
  }

  public fetchGenreTvShows(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`,
    });

    const params = new HttpParams().set('language', 'en-US');

    return this.http.get(`${this.GENRE_TVSHOW_URL}`, { headers, params });
  }

  public setGenreTvShow(genreTvShow: any) {
    this.genreMapTvShow = genreTvShow.genres.reduce(
      (acc: { [key: number]: string }, genre: any) => {
        acc[genre.id] = genre.name;
        return acc;
      },
      {}
    );
  }

  public getGenreTvShow(): { [id: number]: string } {
    return this.genreMapTvShow;
  }
}
