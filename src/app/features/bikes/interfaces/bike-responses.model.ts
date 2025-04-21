import { BikeDetails, BikeSummary } from "./bike.model";

export interface BikeSearchResponse {
  bikes: BikeSummary[];
}

export interface BikeDetailsResponse {
  bike: BikeDetails;
}
