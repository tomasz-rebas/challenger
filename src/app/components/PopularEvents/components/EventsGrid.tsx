import Image from "next/image";
import Link from "next/link";
import { EventLocation, PopularEvent } from "@/app/types";

interface Props {
  events: PopularEvent[];
  locations: EventLocation[];
}

export default function EventsGrid({ events, locations }: Props) {
  function getLabel(event: PopularEvent) {
    const { name, locationId } = event;

    const location = locations.find(
      (location: EventLocation) => locationId === location.id
    );

    return location ? `${location.name} - ${name}` : name;
  }

  if (!events || events.length === 0) {
    return <p>No events to show</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {events.map((event: PopularEvent) => (
        <Link href={`/event/${event.id}`} key={`event_card_${event.id}`}>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 p-2">
              <h1 className="text-sm text-primary-foreground">{event.name}</h1>
              <p className="text-xs text-secondary-foreground">
                {getLabel(event)}
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
  );
}
