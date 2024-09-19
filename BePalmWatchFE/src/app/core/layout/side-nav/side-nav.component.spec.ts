import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of links in the template', () => {
    const links = fixture.debugElement.queryAll(By.css('li'));
    expect(links.length).toBe(component.SIDE_BAR_LINKS.length);
  })
});
