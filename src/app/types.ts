export interface Event {
  id: number;
  name: string;
  alerts: number;
  date: string;
  locationId: number;
  description: string | null;
  imageUrl: string;
}
