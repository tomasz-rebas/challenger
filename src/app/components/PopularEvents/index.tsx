"use client";

import { useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { Input as Search } from "@/components/ui/input";
import { EventLocation, PopularEvent } from "@/app/types";
import EventsGrid from "./components/EventsGrid";
import Filtering from "./components/Filtering";

interface Props {
  events: PopularEvent[];
  locations: EventLocation[];
}

export function PopularEvents({ events, locations }: Props) {
  const [search, setSearch] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const filteredEvents = useMemo(() => {
    return events.filter(
      (event: PopularEvent) =>
        selectedLocation === "all" || `${event.locationId}` === selectedLocation
    );
  }, [events, selectedLocation]);

  return (
    <>
      <h1 className="text-xl flex items-center gap-2">
        <Calendar /> Popular events
      </h1>
      <Search
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-auto"
        aria-label="Search events"
      />
      <Filtering
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <EventsGrid events={filteredEvents} locations={locations} />
    </>
  );
}
