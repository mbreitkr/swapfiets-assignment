import { Component } from "@angular/core";

import { BikeDetailsComponent } from "../../../features/bikes/components/bike-details/bike-details.component";
import { BackButtonComponent } from "../../../shared/components/back-button/back-button.component";

@Component({
  selector: "app-details",
  imports: [BikeDetailsComponent, BackButtonComponent],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent {}
