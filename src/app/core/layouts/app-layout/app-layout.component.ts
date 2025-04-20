import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: "app-app-layout",
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app-layout.component.html",
  styleUrl: "./app-layout.component.scss",
})
export class AppLayoutComponent {}
