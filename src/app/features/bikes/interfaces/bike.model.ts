export interface BikeSummary {
  frame_model: string;
  id: number;
  location_found: string | null;
  manufacturer_name: string;
  status: string;
  stolen_location: string | null;
  thumb: string;
  title: string;
}

export interface BikeDetails extends BikeSummary {
  description: string;
  serial: string;
  large_img: string;
}
