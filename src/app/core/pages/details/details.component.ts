import { Component } from "@angular/core";

import { BikeDetailsComponent } from "../../../features/bikes/components/bike-details/bike-details.component";

@Component({
  selector: "app-details",
  imports: [BikeDetailsComponent],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent {}
