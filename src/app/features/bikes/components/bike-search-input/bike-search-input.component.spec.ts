import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BikeSearchInputComponent } from "./bike-search-input.component";

xdescribe("BikeSearchInputComponent", () => {
  let component: BikeSearchInputComponent;
  let fixture: ComponentFixture<BikeSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeSearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BikeSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
