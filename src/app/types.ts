export interface PopularEvent {
  id: number;
  name: string;
  alerts: number;
  date: string;
  locationId: number;
  description: string | null;
  imageUrl: string;
}

export interface EventLocation {
  id: number;
  name: string;
  city: string;
  country: string;
  imageUrl: string;
}

export interface Params {
  id: string;
}
