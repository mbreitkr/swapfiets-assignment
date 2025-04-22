import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BikeSummary } from "../../interfaces/bike.model";

@Component({
  selector: "app-bike-search-result-card",
  imports: [CommonModule],
  templateUrl: "./bike-search-result-card.component.html",
  styleUrl: "./bike-search-result-card.component.scss",
})
export class BikeSearchResultCardComponent {
  bikeSearchResult = input.required<BikeSummary>();

  get bikeImage(): string {
    return this.bikeSearchResult().thumb ?? "img/placeholder_300x300@2x.png";
  }

  get lastKnownLocation(): string {
    return (
      this.bikeSearchResult().stolen_location ??
      this.bikeSearchResult().location_found ??
      "Unknown"
    );
  }

  get serialNumber(): string {
    return this.bikeSearchResult().serial ?? "Unknown";
  }

  openDetailsPage(): void {
    window.open(`/details/${this.bikeSearchResult().id}`);
  }
}
