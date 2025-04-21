import {
  Component,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { BikeSearchInputComponent } from "../bike-search-input/bike-search-input.component";
import { BikeSearchResultsComponent } from "../bike-search-results/bike-search-results.component";
import { BikeSummary } from "../../interfaces/bike.model";
import { BikesApiService } from "../../services/bikes-api.service";

@Component({
  selector: "app-bike-search",
  imports: [BikeSearchInputComponent, BikeSearchResultsComponent],
  templateUrl: "./bike-search.component.html",
  styleUrl: "./bike-search.component.scss",
})
export class BikeSearchComponent {
  bikeSearchResults: WritableSignal<BikeSummary[]> = signal([]);
  isSearchResultsLoading = signal(false);
  isSearchResultsError = signal(false);

  private bikeApi = inject(BikesApiService);
  private destroyRef = inject(DestroyRef);

  searchBikes(city: string): void {
    this.isSearchResultsError.set(false);
    this.isSearchResultsLoading.set(true);
    this.bikeSearchResults.set([]);

    this.bikeApi
      .getBikesByCity(city)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (results) => {
          this.bikeSearchResults.set(results);
          this.isSearchResultsLoading.set(false);
        },
        error: (err) => {
          this.isSearchResultsError.set(true);
          console.error(err);
          this.isSearchResultsLoading.set(false);
        },
      });
  }
}
