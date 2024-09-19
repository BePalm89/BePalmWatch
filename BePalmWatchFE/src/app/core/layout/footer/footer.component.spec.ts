import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of links in the template', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBe(component.FOOTER_LINKS.length);
  });

  it('should render links with correct href, icon', () => {
    const linksElements = fixture.debugElement.queryAll(By.css('a'));

    linksElements.forEach((linkEl, index) => {
      const link = component.FOOTER_LINKS[index];
      
      const a = linkEl.nativeElement as HTMLAnchorElement;
      expect(a.href).toEqual(link.url);

      const img = linkEl.query(By.css('img'));
      expect(img.nativeElement.src).toContain(link.icon);
    })
  })
});
