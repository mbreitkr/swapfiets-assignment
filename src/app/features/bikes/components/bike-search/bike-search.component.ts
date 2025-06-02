import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";

import { BikeSearchInputComponent } from "../bike-search-input/bike-search-input.component";
import { BikeSearchResultsComponent } from "../bike-search-results/bike-search-results.component";

import { BikeSearchFormValues } from "../../interfaces/bike-search-form.model";
import { BikeSearchService } from "../../services/bike-search.service";

@Component({
  selector: "app-bike-search",
  imports: [BikeSearchInputComponent, BikeSearchResultsComponent],
  templateUrl: "./bike-search.component.html",
  styleUrl: "./bike-search.component.scss",
})
export class BikeSearchComponent implements OnInit {
  lastSearchedText = signal("");
  lastSearchedColor = signal("");
  currentResultPageIndex = signal(0);

  private readonly route = inject(ActivatedRoute);
  private router = inject(Router);
  protected readonly bikeSearchService = inject(BikeSearchService);

  currentResultPage = computed(() => this.currentResultPageIndex() + 1);

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    if ("city" in params && "page" in params) {
      const city = params["city"];
      const pageNum = params["page"];
      const color = params["color"] ?? "";
      const curPageIndex = pageNum - 1;

      this.lastSearchedText.set(city);
      this.lastSearchedColor.set(color);
      this.currentResultPageIndex.set(curPageIndex);
      this.bikeSearchService.searchBikes(city, color, pageNum);
    } else {
      this.setRouteParams({});
    }
  }

  handleSearchSubmit({ city, color }: BikeSearchFormValues) {
    this.lastSearchedText.set(city);
    this.lastSearchedColor.set(color);
    this.currentResultPageIndex.set(0);
    this.setRouteParams({
      city: city,
      page: 1,
      color: color !== "" ? color : null,
    });
    this.bikeSearchService.searchBikes(city, color);
  }

  handlePageChange(pageEvent: PageEvent): void {
    const pageIndex = pageEvent.pageIndex;
    const currentPage = pageIndex + 1;

    this.currentResultPageIndex.set(pageIndex);
    this.setRouteParams({ page: currentPage });
    this.bikeSearchService.searchBikes(
      this.lastSearchedText(),
      this.lastSearchedColor(),
      currentPage,
    );
  }

  setRouteParams(params: Params): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: "merge",
    });
  }
}
