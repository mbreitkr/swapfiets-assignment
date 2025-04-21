import {
  Component,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { BikeSearchResultCardComponent } from "../bike-search-result-card/bike-search-result-card.component";
import { BikesApiService } from "../../services/bikes-api.service";
import { BikeSummary } from "../../interfaces/bike.model";

@Component({
  selector: "app-bike-search-results",
  imports: [BikeSearchResultCardComponent],
  templateUrl: "./bike-search-results.component.html",
  styleUrl: "./bike-search-results.component.scss",
})
export class BikeSearchResultsComponent {
  bikeSearchResults: WritableSignal<BikeSummary[]> = signal([]);
  isLoading = signal(false);
  isError = signal(false);

  private bikeApi = inject(BikesApiService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.searchBikes("Amsterdam");
  }

  searchBikes(city: string): void {
    this.isError.set(false);
    this.isLoading.set(true);

    this.bikeApi
      .getBikesByCity(city)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (results) => {
          this.bikeSearchResults.set(results);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isError.set(true);
          console.error(err);
          this.isLoading.set(false);
        },
      });
  }
}
