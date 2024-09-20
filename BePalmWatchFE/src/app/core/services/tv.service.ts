import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TvService {
  private readonly TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo";
  private readonly GET_TV_URL = "https://api.themoviedb.org/3/discover/tv";
  private readonly ADD_FAVORITE_URL =
    "https://api.themoviedb.org/3/account/10346540/favorite";
  private readonly GET_FAVORITE_URL =
    "https://api.themoviedb.org/3/account/10346540/favorite/tv";
  private readonly GET_DETAILS_TV_SHOW_BY_ID =
    "https://api.themoviedb.org/3/tv/";

  private readonly http = inject(HttpClient);

  public getTVShows(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`,
    });

    const params = new HttpParams()
      .set("language", "en-US")
      .set("sort_by", "popularity.desc");

    return this.http.get(this.GET_TV_URL, { headers, params });
  }

  public addFavorite(tvShow: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`,
    });

    const params = new HttpParams().set("language", "en-US");

    return this.http.post(this.ADD_FAVORITE_URL, tvShow, { headers, params });
  }

  public getFavoriteTvShow(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`,
    });

    const params = new HttpParams()
      .set("language", "en-US")
      .set("sort_by", "popularity.desc");

    return this.http.get(this.GET_FAVORITE_URL, { headers, params });
  };

  public getDetailsTvShow(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`,
    });

    const params = new HttpParams()
      .set('language', 'en-US')

    return this.http.get(`${this.GET_DETAILS_TV_SHOW_BY_ID}${id}`, { headers, params });
  }
}
