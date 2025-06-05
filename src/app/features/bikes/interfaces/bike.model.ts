// TODO: Add interfaces for raw data from the API
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
  type_of_cycle: string | null;
  frame_size: string | null;
  frame_material_slug: string | null;
}

export interface BikeColor {
  name: string;
  slug: string;
  id: number;
  hex_code: string;
}
