import { TestBed } from "@angular/core/testing";
import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";

import { BikesApiService } from "./bikes-api.service";

import {
  BIKE_INDEX_V3_API_BASE_URL,
  BIKE_SEARCH_RESULTS_PER_PAGE,
} from "../../../core/constants/api.config";
import { expectStaticBikeSearchParams } from "../testing/bike-api-test-helpers";
import { bikeSummariesMock } from "../testing/mocks/bike-search-results.mock";
import { bikeDetailsMock } from "../testing/mocks/bike-details.mock";
import { bikeResultsCountMock } from "../testing/mocks/bike-results-count.mock";

describe("BikesApiService", () => {
  let bikeApiService: BikesApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BikesApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    bikeApiService = TestBed.inject(BikesApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe("getBikesByCity", () => {
    const resultsPerPage = BIKE_SEARCH_RESULTS_PER_PAGE;

    it("should return a valid page of search results", () => {
      // SETUP
      const city = "Amsterdam";
      const pageNumber = 1;
      const singleBikeId = 2710350;
      // EXECUTION
      bikeApiService
        .getBikesByCity(city, pageNumber, resultsPerPage)
        .subscribe((bikeSummaries) => {
          // ASSERT
          expect(bikeSummaries).toBeTruthy();
          expect(bikeSummaries.length).toBe(10);

          const bikeSummary = bikeSummaries.find(
            (bike) => bike.id === singleBikeId,
          );
          expect(bikeSummary?.title).toBe("Bike Fun Leonardo");
        });

      const request = httpTestingController.expectOne(
        (req) => req.url === `${BIKE_INDEX_V3_API_BASE_URL}/search`,
      );
      expect(request.request.method).toBe("GET");
      // Query param checks
      expect(request.request.params.get("location")).toBe(city);
      expect(request.request.params.get("page")).toBe(pageNumber.toString());
      expect(request.request.params.get("per_page")).toBe(
        resultsPerPage.toString(),
      );
      expectStaticBikeSearchParams(request);

      request.flush({ bikes: bikeSummariesMock });
    });

    it("should produce a 500 error if the server responds with a 500 error", () => {
      // SETUP
      const city = "Amsterdam";
      const pageNumber = 1;
      const errorMessage = "Internal server error";

      // EXECUTION
      bikeApiService
        .getBikesByCity(city, pageNumber, resultsPerPage)
        .subscribe({
          next: () =>
            fail("the getBikesByCity operation should have produced an error"), // ASSERTION
          error: (err: HttpErrorResponse) => {
            // ASSERTION
            expect(err.status).toBe(500);
            expect(err.error).toBe(errorMessage);
          },
        });

      // ASSERTION
      const request = httpTestingController.expectOne(
        (req) => req.url === `${BIKE_INDEX_V3_API_BASE_URL}/search`,
      );
      expect(request.request.method).toBe("GET");
      expect(request.request.params.get("location")).toBe(city);
      expect(request.request.params.get("page")).toBe(pageNumber.toString());
      expect(request.request.params.get("per_page")).toBe(
        resultsPerPage.toString(),
      );
      expectStaticBikeSearchParams(request);

      request.flush(errorMessage, { status: 500, statusText: errorMessage }); // EXECUTION
    });
  });

  describe("getBikesResultCountByCity()", () => {
    it("should return a valid bikes result count", () => {
      // SETUP
      const city = "Amsterdam";
      const bikeResultsCount = bikeResultsCountMock.proximity;

      // EXECUTION
      bikeApiService.getBikesResultCountByCity(city).subscribe((count) => {
        // ASSERTION
        expect(count).toBe(bikeResultsCount);
      });

      // ASSERTION
      const request = httpTestingController.expectOne(
        (req) => req.url === `${BIKE_INDEX_V3_API_BASE_URL}/search/count`,
      );
      expect(request.request.method).toBe("GET");
      // Query param check
      expect(request.request.params.get("location")).toBe(city);
      expectStaticBikeSearchParams(request);

      request.flush(bikeResultsCountMock); // EXECUTION
    });

    it("should produce a 500 error if the server responds with a 500 error", () => {
      // SETUP
      const city = "Amsterdam";
      const errorMessage = "Internal server error";

      // EXECUTION
      bikeApiService.getBikesResultCountByCity(city).subscribe({
        next: () =>
          fail(
            "the getBikesResultCountByCity operation should have produced an error",
          ),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.error).toBe(errorMessage);
        },
      });

      // ASSERTION
      const request = httpTestingController.expectOne(
        (req) => req.url === `${BIKE_INDEX_V3_API_BASE_URL}/search/count`,
      );
      expect(request.request.method).toBe("GET");
      // Query param check
      expect(request.request.params.get("location")).toBe(city);
      expectStaticBikeSearchParams(request);

      request.flush(errorMessage, {
        status: 500,
        statusText: "Internal server error",
      }); // EXECUTION
    });
  });

  describe("getBikeById()", () => {
    it("should return a bike when given a valid ID", () => {
      // SETUP
      const bikeId = 2762265;
      const bikeTitle = "2025 Giant TCR Advanced 0";

      // EXECUTION
      bikeApiService.getBikeById(bikeId).subscribe((bikeDetails) => {
        // ASSERTION
        expect(bikeDetails).toBeTruthy();
        expect(bikeDetails.id).toBe(bikeId);
        expect(bikeDetails.title).toBe(bikeTitle);
      });

      // ASSERTION
      const request = httpTestingController.expectOne(
        `${BIKE_INDEX_V3_API_BASE_URL}/bikes/${bikeId}`,
      );
      expect(request.request.method).toBe("GET");

      request.flush({ bike: bikeDetailsMock }); // EXECUTION
    });

    it("should produce a 404 error when given an invalid ID", () => {
      // SETUP
      const bikeId = 2389472093472309;
      const errorMessage = "Couldn't find Bike with 'id'=2389472093472309";

      // EXECUTION
      bikeApiService.getBikeById(bikeId).subscribe({
        next: () =>
          fail("the getBikeById operation should have produced an error"),
        error: (error: HttpErrorResponse) => {
          // ASSERTION
          expect(error.status).toBe(404);
          expect(error.error).toBe(errorMessage);
        },
      });

      const request = httpTestingController.expectOne(
        `${BIKE_INDEX_V3_API_BASE_URL}/bikes/${bikeId}`,
      );
      expect(request.request.method).toBe("GET");

      request.flush(errorMessage, {
        status: 404,
        statusText: "No page found",
      }); // EXECUTION
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
