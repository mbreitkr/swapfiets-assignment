import { Routes } from "@angular/router";

import { PageNotFoundComponent } from "./core/pages/page-not-found/page-not-found.component";
import { AppLayoutComponent } from "./core/layouts/app-layout/app-layout.component";

export const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent,
    title: "Swapfiets Bike Locator",
    children: [
      {
        path: "search",
        loadComponent: () =>
          import("./core/pages/search/search.component").then(
            (c) => c.SearchComponent,
          ),
        title: "Swapfiets Bike Locator",
      },
      {
        path: "details/:id",
        loadComponent: () =>
          import("./core/pages/details/details.component").then(
            (c) => c.DetailsComponent,
          ),
        title: "Bike Details",
      },
      { path: "", redirectTo: "/search", pathMatch: "full" },
      { path: "**", component: PageNotFoundComponent, title: "Page not found" },
    ],
  },
  {
    path: "**",
    redirectTo: "",
  },
];
