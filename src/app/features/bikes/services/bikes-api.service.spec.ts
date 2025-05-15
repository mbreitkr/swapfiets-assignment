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
import { bikeColorsMock } from "../testing/mocks/bike-colors.mock";

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
      const color = "";
      const pageNumber = 1;
      const singleBikeId = 2710350;
      // EXECUTION
      bikeApiService
        .getBikesByCity(city, color, pageNumber, resultsPerPage)
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
      expect(request.request.params.get("color")).toBeNull();
      expect(request.request.params.get("page")).toBe(pageNumber.toString());
      expect(request.request.params.get("per_page")).toBe(
        resultsPerPage.toString(),
      );
      expectStaticBikeSearchParams(request);

      request.flush({ bikes: bikeSummariesMock });
    });

    it("should set the color param on the request if color is not an empty string", () => {
      const city = "Amsterdam";
      const color = "brown";
      const pageNumber = 1;
      // EXECUTION
      bikeApiService
        .getBikesByCity(city, color, pageNumber, resultsPerPage)
        .subscribe((bikeSummaries) => {
          // ASSERT
          expect(bikeSummaries).toBeTruthy();
        });

      const request = httpTestingController.expectOne(
        (req) => req.url === `${BIKE_INDEX_V3_API_BASE_URL}/search`,
      );
      expect(request.request.method).toBe("GET");
      // Query param checks
      expect(request.request.params.get("location")).toBe(city);
      expect(request.request.params.get("colors")).toBe(color);
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
      const color = "";
      const pageNumber = 1;
      const errorMessage = "Internal server error";

      // EXECUTION
      bikeApiService
        .getBikesByCity(city, color, pageNumber, resultsPerPage)
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
      const color = "";
      const bikeResultsCount = bikeResultsCountMock.proximity;

      // EXECUTION
      bikeApiService
        .getBikesResultCountByCity(city, color)
        .subscribe((count) => {
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

    it("should set the color param on the request if color is not an empty string", () => {
      // SETUP
      const city = "Amsterdam";
      const color = "brown";

      // EXECUTION
      bikeApiService
        .getBikesResultCountByCity(city, color)
        .subscribe((count) => {
          // ASSERTION
          expect(count).toBeTruthy();
        });

      // ASSERTION
      const request = httpTestingController.expectOne(
        (req) => req.url === `${BIKE_INDEX_V3_API_BASE_URL}/search/count`,
      );
      expect(request.request.method).toBe("GET");
      // Query param check
      expect(request.request.params.get("location")).toBe(city);
      expect(request.request.params.get("colors")).toBe(color);
      expectStaticBikeSearchParams(request);

      request.flush(bikeResultsCountMock); // EXECUTION
    });

    it("should produce a 500 error if the server responds with a 500 error", () => {
      // SETUP
      const city = "Amsterdam";
      const color = "";
      const errorMessage = "Internal server error";

      // EXECUTION
      bikeApiService.getBikesResultCountByCity(city, color).subscribe({
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

  describe("getBikeColors()", () => {
    it("should return an array of available color objects", () => {
      // EXECUTION
      bikeApiService.getBikeColors().subscribe((bikeColors) => {
        // ASSERTION
        expect(bikeColors).toBeTruthy();
        expect(bikeColors.length).toBe(13);
      });

      // ASSERTION
      const request = httpTestingController.expectOne(
        (req) => req.url === `${BIKE_INDEX_V3_API_BASE_URL}/selections/colors`,
      );
      expect(request.request.method).toBe("GET");

      request.flush({ colors: bikeColorsMock }); // EXECUTION
    });
    it("should produce a 500 error if the server responds with a 500 error", () => {
      // SETUP
      const errorMessage = "Internal server error";

      // EXECUTION
      bikeApiService.getBikeColors().subscribe({
        next: () =>
          fail("the getBikeColors operation should have produced an error"),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.error).toBe(errorMessage);
        },
      });

      // ASSERTION
      const request = httpTestingController.expectOne(
        (req) => req.url === `${BIKE_INDEX_V3_API_BASE_URL}/selections/colors`,
      );
      expect(request.request.method).toBe("GET");

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
