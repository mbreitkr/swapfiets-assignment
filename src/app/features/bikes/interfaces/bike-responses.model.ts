import { BikeColor, BikeDetails, BikeSummary } from "./bike.model";

export interface BikeSearchResponse {
  bikes: BikeSummary[];
}

export interface BikeDetailsResponse {
  bike: BikeDetails;
}

export interface BikeSearchCountResponse {
  proximity: number;
  stolen: number;
  non: number;
}

export interface BikeColorsResponse {
  colors: BikeColor[];
}
