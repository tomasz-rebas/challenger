import { PopularEvent } from "@/app/types";
import { PopularEvents } from "./components/PopularEvents";
import { getFormattedDate } from "./helpers/getFormattedDate";
import { fetchData } from "./helpers/fetchData";

export default async function Home() {
  const eventData = await fetchData("events/popular");
  const locationData = await fetchData("locations");

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
