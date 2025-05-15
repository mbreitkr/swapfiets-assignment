import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";

import {
  BIKE_INDEX_V3_API_BASE_URL as BASE_URL,
  BIKE_SEARCH_RADIUS_MILES,
} from "../../../core/constants/api.config";
import { BikeColor, BikeDetails, BikeSummary } from "../interfaces/bike.model";
import {
  BikeColorsResponse,
  BikeDetailsResponse,
  BikeSearchCountResponse,
  BikeSearchResponse,
} from "../interfaces/bike-responses.model";

@Injectable({
  providedIn: "root",
})
export class BikesApiService {
  private http = inject(HttpClient);

  getBikesByCity(
    city: string,
    color: string,
    pageNumber: number,
    resultsPerPage: number,
  ): Observable<BikeSummary[]> {
    let searchParams = new HttpParams()
      .set("location", city)
      .set("page", pageNumber)
      .set("per_page", resultsPerPage)
      .set("stolenness", "proximity")
      .set("distance", BIKE_SEARCH_RADIUS_MILES);

    if (color !== "") searchParams = searchParams.set("colors", color);

    return this.http
      .get<BikeSearchResponse>(`${BASE_URL}/search`, {
        params: searchParams,
      })
      .pipe(map((resp) => resp.bikes));
  }

  getBikesResultCountByCity(city: string, color: string): Observable<number> {
    let searchParams = new HttpParams()
      .set("location", city)
      .set("stolenness", "proximity")
      .set("distance", BIKE_SEARCH_RADIUS_MILES);

    if (color !== "") searchParams = searchParams.set("colors", color);

    return this.http
      .get<BikeSearchCountResponse>(`${BASE_URL}/search/count`, {
        params: searchParams,
      })
      .pipe(map((resp) => resp.proximity));
  }

  getBikeById(id: number): Observable<BikeDetails> {
    return this.http
      .get<BikeDetailsResponse>(`${BASE_URL}/bikes/${id}`)
      .pipe(map((resp) => resp.bike));
  }

  getBikeColors(): Observable<BikeColor[]> {
    return this.http
      .get<BikeColorsResponse>(`${BASE_URL}/selections/colors`)
      .pipe(map((resp) => resp.colors));
  }
}
