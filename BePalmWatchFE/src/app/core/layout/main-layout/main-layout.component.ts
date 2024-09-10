import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { GenreService } from '../../services/genre.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    RouterModule,
    TopBarComponent,
    FooterComponent,
    SideNavComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {

  private readonly genreService = inject(GenreService);

  constructor() {
    forkJoin([
      this.genreService.fetchGenreMovies(), 
      this.genreService.fetchGenreTvShows()
    ])
    .subscribe(([genreMovies, genreTvShow]) => {
     this.genreService.setGenreMovie(genreMovies);
     this.genreService.setGenreTvShow(genreTvShow);
    })
  }

}
