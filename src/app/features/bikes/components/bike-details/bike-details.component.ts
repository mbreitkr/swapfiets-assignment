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

import { BikesApiService } from "../../services/bikes-api.service";
import { BikeDetails } from "../../interfaces/bike.model";

@Component({
  selector: "app-bike-details",
  imports: [CommonModule],
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
          console.log(bike);
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
}
