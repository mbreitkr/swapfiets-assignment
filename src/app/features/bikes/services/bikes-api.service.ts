import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";

import {
  BIKE_INDEX_V3_API_BASE_URL,
  BIKE_SEARCH_RADIUS_MILES,
} from "../../../core/constants/api.config";
import { BikeDetails, BikeSummary } from "../interfaces/bike.model";
import {
  BikeDetailsResponse,
  BikeSearchResponse,
} from "../interfaces/bike-responses.model";

@Injectable({
  providedIn: "root",
})
export class BikesApiService {
  private http = inject(HttpClient);
  private baseUrl = BIKE_INDEX_V3_API_BASE_URL;
  private bikeSearchRadiusMiles = BIKE_SEARCH_RADIUS_MILES;

  getBikesByCity(city: string): Observable<BikeSummary[]> {
    const searchParams = new HttpParams()
      .set("location", city)
      .set("distance", this.bikeSearchRadiusMiles)
      .set("stolenness", "proximity");

    return this.http
      .get<BikeSearchResponse>(`${this.baseUrl}/search`, {
        params: searchParams,
      })
      .pipe(map((resp) => resp.bikes));
  }

  getBikeById(id: number): Observable<BikeDetails> {
    return this.http
      .get<BikeDetailsResponse>(`${this.baseUrl}/bikes/${id}`)
      .pipe(map((resp) => resp.bike));
  }
}
