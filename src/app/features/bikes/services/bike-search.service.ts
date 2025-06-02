import { DestroyRef, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { forkJoin } from "rxjs";
import { BikeSummary } from "../interfaces/bike.model";
import { BIKE_SEARCH_RESULTS_PER_PAGE } from "../../../core/constants/api.config";
import { BikesApiService } from "./bikes-api.service";

@Injectable({
  providedIn: "root",
})
export class BikeSearchService {
  private searchResults = signal<BikeSummary[]>([]);
  private resultCount = signal(0);
  private isLoading = signal(false);
  private isError = signal(false);
  private isEmpty = signal(false);
  private resultPageSize = signal(BIKE_SEARCH_RESULTS_PER_PAGE);

  public bikeSearchResults = this.searchResults.asReadonly();
  public searchResultCount = this.resultCount.asReadonly();
  public isSearchResultsLoading = this.isLoading.asReadonly();
  public isSearchResultsError = this.isError.asReadonly();
  public isSearchResultsEmpty = this.isEmpty.asReadonly();
  public searchResultPageSize = this.resultPageSize.asReadonly();

  private readonly bikesApiService = inject(BikesApiService);
  private readonly destroyRef = inject(DestroyRef);

  searchBikes(city: string, color: string, pageNumber = 1): void {
    this.isError.set(false);
    this.isEmpty.set(false);
    this.isLoading.set(true);
    this.searchResults.set([]);

    forkJoin({
      searchResults: this.bikesApiService.getBikesByCity(
        city,
        color,
        pageNumber,
        this.resultPageSize(),
      ),
      resultCount: this.bikesApiService.getBikesResultCountByCity(city, color),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ searchResults, resultCount }) => {
          if (resultCount === 0) this.isEmpty.set(true);
          this.searchResults.set(searchResults);
          this.resultCount.set(resultCount);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isError.set(true);
          console.error(err);
          this.isLoading.set(false);
        },
      });
  }
}
