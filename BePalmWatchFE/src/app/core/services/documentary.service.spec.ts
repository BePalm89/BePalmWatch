import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { DocumentaryService } from "./documentary.service";
import { DOCUMENTARY_MOCK } from "../mocks/documentaries.mock";

describe("DocumentaryService", () => {
  let service: DocumentaryService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DocumentaryService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call getDocumentaries with the correct url, parameter and header and return an array of documentaries", () => {
    const mockResponse = { results: DOCUMENTARY_MOCK };

    service.getDocumentaries().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpController.expectOne((request) => {
      return (
        request.url === "https://api.themoviedb.org/3/discover/movie" &&
        request.method === "GET" &&
        request.headers.get("Authorization") ===
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo" &&
        request.params.has("language") &&
        request.params.get("language") === "en-US" &&
        request.params.has("sort_by") &&
        request.params.get("sort_by") === "popularity.desc" &&
        request.params.has("with_genres") &&
        request.params.get("with_genres") === "99"
      );
    });

    req.flush(mockResponse);
  });
});
