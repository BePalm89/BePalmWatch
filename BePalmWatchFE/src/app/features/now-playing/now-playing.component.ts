import { Component, inject } from '@angular/core';
import { NowPlayingService } from '../../core/services/now-playing.service';
import { CardContainerComponent } from '../../shared/ui/card-container/card-container.component';
import { Date } from '../../core/models/date.model';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { MediaTypeEnum } from '../../core/enum/media-type.enum';

@Component({
  selector: 'app-now-playing',
  standalone: true,
  imports: [CardContainerComponent, CommonModule],
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.css'
})
export class NowPlayingComponent {

  private readonly nowPlayingService = inject(NowPlayingService);

  nowPlayingMovies: any[] = [];
  date: Date | null = null;
  mediaType = MediaTypeEnum;

  constructor() {
    this.date = { minimum: dayjs().toString(), maximum: dayjs().add(4, 'day').toString() }
    this.nowPlayingService.getNowPlayingMovies().subscribe((resp) => {
        this.nowPlayingMovies = resp;
    })
  }

}
