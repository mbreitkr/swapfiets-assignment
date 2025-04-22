import { Component, input, output } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";

import { BikeSearchResultCardComponent } from "../bike-search-result-card/bike-search-result-card.component";

import { BikeSummary } from "../../interfaces/bike.model";

@Component({
  selector: "app-bike-search-results",
  imports: [
    BikeSearchResultCardComponent,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  templateUrl: "./bike-search-results.component.html",
  styleUrl: "./bike-search-results.component.scss",
})
export class BikeSearchResultsComponent {
  bikeSearchResults = input.required<BikeSummary[]>();
  isLoading = input(false);
  isError = input(false);
  isSearchResultsEmpty = input(false);
  totalResults = input(0);
  currentPageIndex = input(0);
  pageSize = input(10);
  pageChange = output<PageEvent>();

  handlePageEvent(pageEvent: PageEvent): void {
    this.pageChange.emit(pageEvent);
  }
}
