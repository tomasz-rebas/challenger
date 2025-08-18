import { EventLocation, PopularEvent } from "@/app/types";
import { getEvents, getLocations } from "./mock-data";

export const database = {
  getPopularEvents: async (): Promise<PopularEvent[]> => {
    const events = await getEvents();

    return events.toSorted((a, b) => b.alerts - a.alerts);
  },

  getEvent: async (id: number): Promise<PopularEvent | null> => {
    const events = await getEvents();

    return events.find((event) => event.id === id) ?? null;
  },

  getLocations: async (): Promise<EventLocation[]> => {
    return await getLocations();
  },

  getLocation: async (id: number): Promise<EventLocation | null> => {
    const locations = await getLocations();

    return locations.find((location) => location.id === id) ?? null;
  },
};
