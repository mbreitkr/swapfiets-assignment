import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";

import {
  BIKE_INDEX_V3_API_BASE_URL as BASE_URL,
  BIKE_SEARCH_RADIUS_MILES,
  BIKE_SEARCH_RESULTS_PER_PAGE,
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

  getBikesByCity(city: string): Observable<BikeSummary[]> {
    const searchParams = new HttpParams()
      .set("location", city)
      .set("stolenness", "proximity")
      .set("distance", BIKE_SEARCH_RADIUS_MILES)
      .set("per_page", BIKE_SEARCH_RESULTS_PER_PAGE);

    return this.http
      .get<BikeSearchResponse>(`${BASE_URL}/search`, {
        params: searchParams,
      })
      .pipe(map((resp) => resp.bikes));
  }

  getBikeById(id: number): Observable<BikeDetails> {
    return this.http
      .get<BikeDetailsResponse>(`${BASE_URL}/bikes/${id}`)
      .pipe(map((resp) => resp.bike));
  }
}
