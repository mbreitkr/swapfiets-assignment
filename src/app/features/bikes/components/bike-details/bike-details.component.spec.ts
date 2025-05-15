import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BikeDetailsComponent } from "./bike-details.component";

xdescribe("BikeDetailsComponent", () => {
  let component: BikeDetailsComponent;
  let fixture: ComponentFixture<BikeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BikeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
