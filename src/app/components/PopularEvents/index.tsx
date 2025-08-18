"use client";

import { Calendar } from "lucide-react";
import { EventLocation, PopularEvent } from "@/app/types";
import EventsGrid from "./components/EventsGrid";

interface Props {
  events: PopularEvent[];
  locations: EventLocation[];
}

export function PopularEvents({ events, locations }: Props) {
  return (
    <>
      <h1 className="text-xl flex items-center gap-2">
        <Calendar /> Popular events
      </h1>
      <EventsGrid events={events} locations={locations} />
    </>
  );
}
