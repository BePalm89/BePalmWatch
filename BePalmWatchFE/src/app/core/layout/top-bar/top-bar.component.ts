import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LinkComponent } from '../../../shared/ui/link/link.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../../shared/ui/search-bar/search-bar.component';
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    LinkComponent,
    RouterModule,
    SearchBarComponent,

  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  LINKS = [
    {
      icon: '/assets/icons/video.png',
      label: 'Movies',
      url: '/',
    },
    {
      icon: 'assets/icons/television.png',
      label: 'TV',
      url: '/tv',
    },
    {
      icon: 'assets/icons/documentary.png',
      label: 'Documentaries',
      url: '/documentaries',
    },
    {
      icon: 'assets/icons/film.png',
      label: 'Now Playing',
      url: '/now-playing',
    }
  ];
}
