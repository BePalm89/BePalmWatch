import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService {

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
