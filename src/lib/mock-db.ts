import { PopularEvent } from "@/app/types";
import { getEvents } from "./mock-data";

export const database = {
  getPopularEvents: async (
    amount: number,
    offset: number
  ): Promise<PopularEvent[]> => {
    const events = await getEvents();

    return events
      .toSorted((a, b) => b.alerts - a.alerts)
      .slice(offset, amount + offset);
  },
  getEvent: async (id: number): Promise<PopularEvent | null> => {
    const events = await getEvents();

    return events.find((event) => event.id === id) ?? null;
  },
};
