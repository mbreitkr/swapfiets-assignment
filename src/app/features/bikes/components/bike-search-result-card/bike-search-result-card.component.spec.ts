import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BikeSearchResultCardComponent } from "./bike-search-result-card.component";
import { bikeSummariesMock } from "../../testing/mocks/bike-search-results.mock";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe("BikeSearchResultCardComponent", () => {
  let fixture: ComponentFixture<BikeSearchResultCardComponent>;
  let component: BikeSearchResultCardComponent;
  let debugEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BikeSearchResultCardComponent],
    });
    fixture = TestBed.createComponent(BikeSearchResultCardComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
  });

  it("should create", async () => {
    // SETUP
    const bikeSummary = bikeSummariesMock[0];

    // EXECUTION
    fixture.componentRef.setInput("bikeSearchResult", bikeSummary);
    await fixture.whenStable();
    fixture.detectChanges();

    // ASSERTION
    expect(component).toBeTruthy();
  });

  it("should display details of the correct inputted bike search result", async () => {
    // SETUP
    const bikeSummary = bikeSummariesMock[0];
    const title = "2022 Gazelle Paris C7+ Hmb";
    const status = "Stolen";
    const serial = "GZ61885614";
    const manufacturer = "Gazelle";
    const lastKnownLocation = "Haarlem, 2012HK, NL";
    const imgUrl =
      "https://files.bikeindex.org/uploads/Pu/915328/small_PXL_20241227_155806282.jpg";

    // EXECUTION
    fixture.componentRef.setInput("bikeSearchResult", bikeSummary);
    await fixture.whenStable();
    fixture.detectChanges();

    const titleEl = debugEl.query(By.css("h2")).nativeElement;
    const statusValueEl = debugEl.query(
      By.css("[data-testid='status-value']"),
    ).nativeElement;
    const serialValueEl = debugEl.query(
      By.css("[data-testid='serial-value']"),
    ).nativeElement;
    const manufacturerValueEl = debugEl.query(
      By.css("[data-testid='manufacturer-value']"),
    ).nativeElement;
    const lastLocationValueEl = debugEl.query(
      By.css("[data-testid='last-location-value']"),
    ).nativeElement;
    const imageEl = debugEl.query(By.css("img")).nativeElement;

    // ASSERTION
    expect(titleEl?.textContent).toContain(title);
    expect(statusValueEl?.textContent).toContain(status);
    expect(serialValueEl?.textContent).toContain(serial);
    expect(manufacturerValueEl?.textContent).toContain(manufacturer);
    expect(lastLocationValueEl?.textContent).toContain(lastKnownLocation);
    expect(imageEl?.src).toBe(imgUrl);
  });

  it("should use a fallback image if a thumb image isn't present", async () => {
    // SETUP
    const bikeSummary = bikeSummariesMock[3]; // has null for thumb image
    const imageUrl = "img/placeholder_300x300@2x.png";

    // EXECUTION
    fixture.componentRef.setInput("bikeSearchResult", bikeSummary);
    await fixture.whenStable();
    fixture.detectChanges();

    // ASSERTION
    const imageEl = debugEl.query(By.css("img")).nativeElement;
    expect(imageEl?.src).toContain(imageUrl);
  });

  it("should call window.open with the correct details page path", async () => {
    // SETUP
    const bikeSummary = bikeSummariesMock[0];
    const detailsPagePath = `/details/${bikeSummary.id}`;
    const windownOpenSpy = spyOn(window, "open");

    // EXECUTION
    fixture.componentRef.setInput("bikeSearchResult", bikeSummary);
    await fixture.whenStable();
    fixture.detectChanges();

    const buttonEl = debugEl.query(By.css("button"));
    buttonEl.triggerEventHandler("click");

    // ASSERTION
    expect(windownOpenSpy).toHaveBeenCalledOnceWith(detailsPagePath);
  });
});
