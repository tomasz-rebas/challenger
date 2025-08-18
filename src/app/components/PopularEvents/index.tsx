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

const isStringMatch = (a: string, b: string) =>
  a.toLowerCase().includes(b.toLowerCase());

export function PopularEvents({ events, locations }: Props) {
  const [search, setSearch] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const filteredEvents = useMemo(() => {
    return events.filter((event: PopularEvent) => {
      const matchesSearch = search === "" || isStringMatch(event.name, search);

      const matchesLocation =
        selectedLocation === "all" ||
        `${event.locationId}` === selectedLocation;

      return matchesSearch && matchesLocation;
    });
  }, [events, search, selectedLocation]);

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
