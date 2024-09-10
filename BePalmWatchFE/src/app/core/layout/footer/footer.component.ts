import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  FOOTER_LINKS = [
    {
      value: 'github',
      url: 'https://github.com/BePalm89',
      icon: '/assets/icons/github.png',
    },
    {
      value: 'linkedin',
      url: 'https://www.linkedin.com/in/claudia-palmerini-b01a99136',
      icon: '/assets/icons/linkedin.png',
    },
    {
      value: 'portfolio',
      url: 'https://bepalm-portfolio.netlify.app/',
      icon: '/assets/icons/portfolio.png',
    },
  ];
}
