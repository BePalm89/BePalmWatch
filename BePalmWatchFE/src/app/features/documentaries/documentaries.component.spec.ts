import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DocumentariesComponent } from "./documentaries.component";
import { DocumentaryService } from "../../core/services/documentary.service";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";

describe("DocumentariesComponent", () => {
  let component: DocumentariesComponent;
  let fixture: ComponentFixture<DocumentariesComponent>;
  let documentariesService: DocumentaryService;

  const mockDocumentaries = {
    results: [
      { id: 1, title: "Docu1" },
      { id: 2, title: "Docu2" },
    ],
  };

  beforeEach(async () => {
    const docServiceMock = {
      getDocumentaries: jest.fn().mockReturnValue(of(mockDocumentaries)),
    };

    await TestBed.configureTestingModule({
      imports: [DocumentariesComponent, HttpClientTestingModule],
      providers: [
        { provide: DocumentaryService, useValue: docServiceMock },
        provideRouter([]),
      ],
    }).compileComponents();

    documentariesService = TestBed.inject(DocumentaryService);
    fixture = TestBed.createComponent(DocumentariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should call getDocumentaries when loading the component', () => {
    expect(documentariesService.getDocumentaries).toHaveBeenCalled();
  })
});
