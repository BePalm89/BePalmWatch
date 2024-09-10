import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'tv',
    loadComponent: () =>
      import('./features/tv/tv.component').then((m) => m.TvComponent),
  },
  {
    path: 'documentaries',
    loadComponent: () =>
      import('./features/documentaries/documentaries.component').then(
        (m) => m.DocumentariesComponent
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favourites/favourites.component').then(
        (m) => m.FavouritesComponent
      ),
  },
  {
    path: 'trending',
    loadComponent: () =>
      import('./features/trending/trending.component').then(
        (m) => m.TrendingComponent
      ),
  },
  {
    path: 'coming-soon',
    loadComponent: () =>
      import('./features/coming-soon/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      ),
  },
  {
    path: 'now-playing',
    loadComponent: () =>
      import('./features/now-playing/now-playing.component').then(
        (m) => m.NowPlayingComponent
      ),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./features/details-movie/details-movie.component').then(
        (m) => m.DetailsMovieComponent
      ),
  },
];
