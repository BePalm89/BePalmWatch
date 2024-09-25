import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NowPlayingComponent } from "./now-playing.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NowPlayingService } from "../../core/services/now-playing.service";
import { of } from "rxjs";
import { provideRouter } from "@angular/router";
import dayjs from "dayjs";

describe("NowPlayingComponent", () => {
  let component: NowPlayingComponent;
  let fixture: ComponentFixture<NowPlayingComponent>;
  let nowPlayingService: NowPlayingService;

  const mockNowPlayingMovies = [{ id: 1, title: "Show1" }];

  beforeEach(async () => {
    const nowPlayingServiceMock = {
      getNowPlayingMovies: jest.fn().mockReturnValue(of(mockNowPlayingMovies)),
    };

    await TestBed.configureTestingModule({
      imports: [NowPlayingComponent, HttpClientTestingModule],
      providers: [
        { provide: NowPlayingService, useValue: nowPlayingServiceMock },
        provideRouter([]),
      ],
    }).compileComponents();

    nowPlayingService = TestBed.inject(NowPlayingService);
    fixture = TestBed.createComponent(NowPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getNowPlayingMovies when loading the page", () => {
    expect(nowPlayingService.getNowPlayingMovies).toHaveBeenCalled();
  });

  it('should se the correct date when loading the component', () => {
    const today = dayjs().toString();
    const futureDay = dayjs().add(4, 'day').toString();

    expect(component.date?.minimum).toBe(today);
    expect(component.date?.maximum).toBe(futureDay);
  })
});
