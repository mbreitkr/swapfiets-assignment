import { CommonModule } from "@angular/common";
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

import { BikesApiService } from "../../services/bikes-api.service";
import { BikeDetails } from "../../interfaces/bike.model";
import { replaceEmptyBikeDetails } from "../../utils/bikeHelper";

@Component({
  selector: "app-bike-details",
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: "./bike-details.component.html",
  styleUrl: "./bike-details.component.scss",
})
export class BikeDetailsComponent implements OnInit {
  bikeDetails: WritableSignal<BikeDetails | null> = signal(null);
  isLoading = signal(false);
  isError = signal(false);

  private bikeApi = inject(BikesApiService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.isError.set(false);
    this.isLoading.set(true);

    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const id = params.get("id");

      if (!id) {
        this.isError.set(true);
        this.isLoading.set(false);
        return;
      }

      this.bikeApi.getBikeById(Number(id)).subscribe({
        next: (bike) => {
          this.bikeDetails.set(bike);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isError.set(true);
          console.error(err);
          this.isLoading.set(false);
        },
      });
    });
  }

  get bikeImage(): string {
    return this.bikeDetails()?.large_img ?? "/img/placeholder_900x675@2x.png";
  }

  get lastKnownLocation(): string {
    return (
      this.bikeDetails()?.stolen_location ??
      this.bikeDetails()?.location_found ??
      "Unknown"
    );
  }

  get frameModel(): string {
    return replaceEmptyBikeDetails(this.bikeDetails()?.frame_model);
  }

  get serialNumber(): string {
    return replaceEmptyBikeDetails(this.bikeDetails()?.serial);
  }

  get description(): string {
    return replaceEmptyBikeDetails(this.bikeDetails()?.description);
  }

  get stolenLocation(): string {
    if (this.bikeDetails()?.stolen === true) {
      return replaceEmptyBikeDetails(this.bikeDetails()?.stolen_location);
    } else {
      return "N/A";
    }
  }

  get foundLocation(): string {
    if (this.bikeDetails()?.status.toLowerCase() === "found") {
      return replaceEmptyBikeDetails(this.bikeDetails()?.location_found);
    } else {
      return "N/A";
    }
  }

  get typeOfCycle(): string {
    return replaceEmptyBikeDetails(this.bikeDetails()?.type_of_cycle);
  }

  get frameSize(): string {
    return replaceEmptyBikeDetails(this.bikeDetails()?.frame_size);
  }

  get frameMaterial(): string {
    return replaceEmptyBikeDetails(this.bikeDetails()?.frame_material_slug);
  }
}
