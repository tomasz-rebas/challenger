"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";
import { EventLocation, PopularEvent } from "@/app/types";
import Link from "next/link";

interface Props {
  events: PopularEvent[];
  locations: EventLocation[];
}

export function PopularEvents({ events, locations }: Props) {
  function getLocationName(locationId: number) {
    const location = locations.find(
      (location: EventLocation) => locationId === location.id
    );

    return location ? location.name : "";
  }

  return (
    <>
      <h1 className="text-xl flex items-center gap-2">
        <Calendar /> Popular events
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {events.map((event) => (
          <Link href={`/event/${event.id}`} key={`event_card_${event.id}`}>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 p-2">
                <h1 className="text-sm text-primary-foreground">
                  {event.name}
                </h1>
                <p className="text-xs text-secondary-foreground">
                  {getLocationName(event.locationId)} - {event.date}
                </p>
              </div>
              <Image
                className="object-cover h-full w-full"
                src={event.imageUrl}
                width={320}
                height={200}
                alt={event.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
