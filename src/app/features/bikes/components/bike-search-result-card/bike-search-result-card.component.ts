import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BikeSummary } from "../../interfaces/bike.model";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-bike-search-result-card",
  imports: [CommonModule, RouterLink],
  templateUrl: "./bike-search-result-card.component.html",
  styleUrl: "./bike-search-result-card.component.scss",
})
export class BikeSearchResultCardComponent {
  bikeSearchResult = input.required<BikeSummary>();
}
