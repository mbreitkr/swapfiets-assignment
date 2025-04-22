import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { forkJoin } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { BikeSearchInputComponent } from "../bike-search-input/bike-search-input.component";
import { BikeSearchResultsComponent } from "../bike-search-results/bike-search-results.component";

import { BikeSummary } from "../../interfaces/bike.model";
import { BikesApiService } from "../../services/bikes-api.service";
import { BIKE_SEARCH_RESULTS_PER_PAGE } from "../../../../core/constants/api.config";

@Component({
  selector: "app-bike-search",
  imports: [BikeSearchInputComponent, BikeSearchResultsComponent],
  templateUrl: "./bike-search.component.html",
  styleUrl: "./bike-search.component.scss",
})
export class BikeSearchComponent implements OnInit {
  bikeSearchResults: WritableSignal<BikeSummary[]> = signal([]);
  lastSearchedText = signal("");
  searchResultCount = signal(0);
  currentResultPageIndex = signal(0);
  isSearchResultsLoading = signal(false);
  isSearchResultsError = signal(false);
  isSearchResultsEmpty = signal(false);
  searchResultPageSize = signal(BIKE_SEARCH_RESULTS_PER_PAGE);

  private bikeApi = inject(BikesApiService);
  private readonly route = inject(ActivatedRoute);
  private router = inject(Router);

  currentResultPage = computed(() => this.currentResultPageIndex() + 1);

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    if ("city" in params && "page" in params) {
      const city = params["city"];
      const pageNum = params["page"];

      this.lastSearchedText.set(city);
      this.currentResultPageIndex.set(pageNum);
      this.searchBikes(city, pageNum);
    } else {
      this.setRouteParams({});
    }
  }

  searchBikes(city: string, pageNumber = 1): void {
    this.isSearchResultsError.set(false);
    this.isSearchResultsEmpty.set(false);
    this.isSearchResultsLoading.set(true);
    this.bikeSearchResults.set([]);

    forkJoin({
      searchResults: this.bikeApi.getBikesByCity(
        city,
        pageNumber,
        this.searchResultPageSize(),
      ),
      resultCount: this.bikeApi.getBikesResultCountByCity(city),
    }).subscribe({
      next: ({ searchResults, resultCount }) => {
        if (resultCount === 0) this.isSearchResultsEmpty.set(true);
        this.bikeSearchResults.set(searchResults);
        this.searchResultCount.set(resultCount);
        this.isSearchResultsLoading.set(false);
      },
      error: (err) => {
        this.isSearchResultsError.set(true);
        console.error(err);
        this.isSearchResultsLoading.set(false);
      },
    });
  }

  handleSearchSubmit(city: string) {
    this.lastSearchedText.set(city);
    this.currentResultPageIndex.set(0);
    this.setRouteParams({ city: city, page: 1 });
    this.searchBikes(city);
  }

  handlePageChange(pageEvent: PageEvent): void {
    const pageIndex = pageEvent.pageIndex;
    this.currentResultPageIndex.set(pageIndex);
    this.setRouteParams({ page: pageIndex + 1 });
    this.searchBikes(this.lastSearchedText(), pageIndex);
  }

  setRouteParams(params: Params): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: "merge",
    });
  }
}
