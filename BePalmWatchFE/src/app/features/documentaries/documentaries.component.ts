import { Component, inject } from '@angular/core';
import { DocumentaryService } from '../../core/services/documentary.service';
import { CardContainerComponent } from '../../shared/ui/card-container/card-container.component';
import { MediaTypeEnum } from '../../core/enum/media-type.enum';

@Component({
  selector: 'app-documentaries',
  standalone: true,
  imports: [CardContainerComponent],
  templateUrl: './documentaries.component.html',
  styleUrl: './documentaries.component.css'
})
export class DocumentariesComponent {

  private readonly documentaryService = inject(DocumentaryService);

  documentaries: any[] = [];
  mediaType = MediaTypeEnum;
   
  constructor() {
    this.documentaryService.getDocumentaries().subscribe((resp) => {
      this.documentaries = resp.results;
    });
  }

}
