import { Routes } from "@angular/router";

import { SearchComponent } from "./core/pages/search/search.component";
import { DetailsComponent } from "./core/pages/details/details.component";
import { PageNotFoundComponent } from "./core/pages/page-not-found/page-not-found.component";
import { AppLayoutComponent } from "./core/layouts/app-layout/app-layout.component";

export const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      { path: "search", component: SearchComponent },
      { path: "details", component: DetailsComponent },
      { path: "", redirectTo: "/search", pathMatch: "full" },
      { path: "**", component: PageNotFoundComponent },
    ],
  },
  {
    path: "**",
    redirectTo: "",
  },
];
