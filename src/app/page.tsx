import { PopularEvent } from "@/app/types";
import { PopularEvents } from "./components/PopularEvents";

export default async function Home() {
  const eventData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/popular?amount=6`
  ).then((response) => response.json());

  const locationData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/locations`
  ).then((response) => response.json());

  return (
    <PopularEvents
      events={eventData.events.map((event: PopularEvent) => {
        return {
          ...event,
          date: new Date(event.date).toLocaleDateString(),
        };
      })}
      locations={locationData.locations}
    />
  );
}
