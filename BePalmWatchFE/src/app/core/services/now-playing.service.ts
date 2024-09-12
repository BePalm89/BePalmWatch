import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService {

  private readonly TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo';
  private readonly GET_MOVIE_NOW_PLAYING_MOVIEDB = 'https://api.themoviedb.org/3/movie/now_playing';
  private readonly GET_MOVIE_NOW_PLAYING = 'http://localhost:3000/api/v1/movies';
  private readonly GET_MOVIE_NOW_PLAYING_BY_ID = 'http://localhost:3000/api/v1/movies/';
  private readonly PUT_MOVIE_NOW_PLAYING_BY_ID = 'http://localhost:3000/api/v1/movies/';

  private readonly http = inject(HttpClient);

  public getNowPlayingMovies(): Observable<any> {
      return this.http.get(this.GET_MOVIE_NOW_PLAYING);
  }

  public getNowPlayingMovieById(id: string ): Observable<any> {
    return this.http.get(`${this.GET_MOVIE_NOW_PLAYING_BY_ID}${id}`);
  }

  public updateNowPlayingMovie(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.PUT_MOVIE_NOW_PLAYING_BY_ID}${id}`, payload);
  }

}
