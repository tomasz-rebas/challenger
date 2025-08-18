"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";

interface Event {
  id: number;
  name: string;
  alerts: number;
  date: string;
  locationId: number;
  description: string | null;
  imageUrl: string;
}

interface Props {
  events: Event[];
}

export function PopularEvents({ events }: Props) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      <h1 className="text-xl md:col-span-3 flex items-center gap-2">
        <Calendar /> Popular events
      </h1>

      {events.map((event) => (
        <div
          key={`event_card_${event.id}`}
          className="relative aspect-video rounded-lg overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 p-2">
            <h1 className="text-sm text-primary-foreground">{event.name}</h1>
            <p className="text-xs text-secondary-foreground">
              {event.locationId} - {new Date(event.date).toLocaleDateString()}
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
      ))}
    </div>
  );
}
