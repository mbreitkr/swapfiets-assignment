import { Component } from "@angular/core";
import { BikeSearchInputComponent } from "../../../features/bikes/components/bike-search-input/bike-search-input.component";
import { BikeSearchResultsComponent } from "../../../features/bikes/components/bike-search-results/bike-search-results.component";

@Component({
  selector: "app-search",
  imports: [BikeSearchInputComponent, BikeSearchResultsComponent],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss",
})
export class SearchComponent {}
