import { PopularEvent } from "@/app/types";
import { PopularEvents } from "./components/PopularEvents";

export default async function Home() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/popular?amount=6`
  ).then((response) => response.json());

  return (
    <PopularEvents
      events={data.events.map((event: PopularEvent) => {
        return {
          ...event,
          date: new Date(event.date).toLocaleDateString(),
        };
      })}
    />
  );
}
