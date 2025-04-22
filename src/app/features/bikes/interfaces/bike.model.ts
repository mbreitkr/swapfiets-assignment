export interface BikeSummary {
  id: number;
  manufacturer_name: string;
  status: string;
  stolen: boolean;
  title: string;
  frame_model: string | null;
  location_found: string | null;
  serial: string | null;
  stolen_location: string | null;
  thumb: string | null;
}

export interface BikeDetails extends BikeSummary {
  description: string;
  large_img: string | null;
}
