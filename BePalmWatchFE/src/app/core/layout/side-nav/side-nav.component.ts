import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { LinkComponent } from '../../../shared/ui/link/link.component';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    LinkComponent,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {

  SIDE_BAR_LINKS = [
    {
      icon: '/assets/icons/love.png',
      label: 'Favorites',
      url: '/favorites',
    },
    {
      icon: 'assets/icons/trending.png',
      label: 'trending',
      url: '/trending',
    },
    {
      icon: 'assets/icons/calendar.png',
      label: 'Coming soon',
      url: '/coming-soon',
    },
  ]
}
