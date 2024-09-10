import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentaryService {

  private readonly TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo';
  private readonly GET_MOVIES_BY_DOCUMENTARY_GENRE = 'https://api.themoviedb.org/3/discover/movie';


  private readonly http = inject(HttpClient);

  public getDocumentaries(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`,
    });

    const params = new HttpParams()
      .set('language', 'en-US')
      .set('sort_by', 'popularity.desc')
      .set('with_genres', 99)

    return this.http.get(this.GET_MOVIES_BY_DOCUMENTARY_GENRE, { headers, params });
  }

}
