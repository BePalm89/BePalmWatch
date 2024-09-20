import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LinkComponent } from "./link.component";
import { Route, Router, provideRouter } from "@angular/router";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  template: "",
})
export class MockComponent {}

describe("LinkComponent", () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let routes: Route[];
  let router: Router;

  routes = [{ path: "tv", component: MockComponent }];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render link label, link url and icon correctly", () => {
    // Given
    component.linkLabel = "label";
    component.linkUrl = "/link";
    component.icon = "icon";

    //When
    fixture.detectChanges();

    // Then
    const linkElement = fixture.nativeElement.querySelector("a");
    const imgElement = fixture.nativeElement.querySelector("img");

    expect(linkElement).toBeTruthy();
    expect(linkElement.textContent).toBe(component.linkLabel);
    expect(linkElement.getAttribute("href")).toBe(component.linkUrl);

    expect(imgElement).toBeTruthy();
    expect(imgElement.getAttribute("src")).toBe(component.icon);
    expect(imgElement.getAttribute("alt")).toBe(component.icon);
  });

  it("should have the active class when route link is active", async() => {
    // Given 
    const linkElement = fixture.nativeElement.querySelector("a");
    // When 
    await router.navigate([component.linkUrl]);

    fixture.detectChanges();

    // Then 
    expect(linkElement.classList).toContain("active");
  });
});
