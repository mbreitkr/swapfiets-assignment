import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BikeSearchResultsComponent } from "./bike-search-results.component";

xdescribe("BikeSearchResultsComponent", () => {
  let component: BikeSearchResultsComponent;
  let fixture: ComponentFixture<BikeSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeSearchResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BikeSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
