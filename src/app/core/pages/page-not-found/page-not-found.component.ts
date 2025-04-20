import { Component } from "@angular/core";

import { BackButtonComponent } from "../../../shared/components/back-button/back-button.component";

@Component({
  selector: "app-page-not-found",
  imports: [BackButtonComponent],
  templateUrl: "./page-not-found.component.html",
  styleUrl: "./page-not-found.component.scss",
})
export class PageNotFoundComponent {}
