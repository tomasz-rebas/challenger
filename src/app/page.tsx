import { PopularEvent } from "@/app/types";
import { PopularEvents } from "./components/PopularEvents";
import { getFormattedDate } from "./helpers/getFormattedDate";

export default async function Home() {
  const eventResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/popular`
  );
  const eventData = await eventResponse.json();

  const locationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/locations`
  );
  const locationData = await locationResponse.json();

  return (
    <PopularEvents
      events={eventData.events.map((event: PopularEvent) => {
        return {
          ...event,
          date: getFormattedDate(event.date),
        };
      })}
      locations={locationData.locations}
    />
  );
}
