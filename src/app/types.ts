export interface PopularEvent {
  id: number;
  name: string;
  alerts: number;
  date: string;
  locationId: number;
  description: string | null;
  imageUrl: string;
}

export interface Params {
  id: string;
}
