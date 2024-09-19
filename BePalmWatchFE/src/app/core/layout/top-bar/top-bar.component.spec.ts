import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TopBarComponent } from "./top-bar.component";
import { provideRouter } from "@angular/router";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("TopBarComponent", () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent, NoopAnimationsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render the correct number of links", () => {
    const links = fixture.debugElement.queryAll(By.css("li"));
    expect(links.length).toBe(component.LINKS.length);
  });
});
