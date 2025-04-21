import { Component } from "@angular/core";
import { BikeSearchComponent } from "../../../features/bikes/components/bike-search/bike-search.component";

@Component({
  selector: "app-search",
  imports: [BikeSearchComponent],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss",
})
export class SearchComponent {}
