import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeSearchResultCardComponent } from './bike-search-result-card.component';

describe('BikeSearchResultCardComponent', () => {
  let component: BikeSearchResultCardComponent;
  let fixture: ComponentFixture<BikeSearchResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeSearchResultCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikeSearchResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
