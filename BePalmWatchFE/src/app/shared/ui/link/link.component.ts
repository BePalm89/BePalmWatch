import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatIconModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css',
})
export class LinkComponent {
  @Input() linkLabel = '';
  @Input() linkUrl = '';
  @Input() icon = '';
}
