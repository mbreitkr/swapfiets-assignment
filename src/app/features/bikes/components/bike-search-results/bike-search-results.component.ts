import { Component } from "@angular/core";

import { BikeSearchResultCardComponent } from "../bike-search-result-card/bike-search-result-card.component";

@Component({
  selector: "app-bike-search-results",
  imports: [BikeSearchResultCardComponent],
  templateUrl: "./bike-search-results.component.html",
  styleUrl: "./bike-search-results.component.scss",
})
export class BikeSearchResultsComponent {}
