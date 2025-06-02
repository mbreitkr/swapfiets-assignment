import { TestBed } from "@angular/core/testing";

import { BikeSearchService } from "./bike-search.service";
import { BikesApiService } from "./bikes-api.service";

describe("BikeSearchService", () => {
  let bikeSearchService: BikeSearchService;
  let bikesApiServiceSpy: jasmine.SpyObj<BikesApiService>;

  beforeEach(() => {
    bikesApiServiceSpy = jasmine.createSpyObj("BikesApiService", [
      "getBikesByCity",
      "getBikesResultCountByCity",
    ]);

    TestBed.configureTestingModule({
      providers: [
        BikeSearchService,
        { provide: BikesApiService, useValue: bikesApiServiceSpy },
      ],
    });

    bikeSearchService = TestBed.inject(BikeSearchService);
  });

  it("should be created", () => {
    expect(bikeSearchService).toBeTruthy();
  });
});
