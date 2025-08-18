import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { EventLocation, Params, PopularEvent } from "@/app/types";
import { getFormattedDate } from "@/app/helpers/getFormattedDate";
import { fetchData } from "@/app/helpers/fetchData";

interface Props {
  params: Params;
}

export default async function Event({ params }: Props) {
  const eventData = await fetchData(`events/popular/${params.id}`);

  if (!eventData.event) {
    notFound();
  }

  const { event }: { event: PopularEvent } = eventData;
  const { imageUrl, name, date, description, locationId } = event;

  const locationData: { location: EventLocation } = await fetchData(
    `locations/${locationId}`
  );

  return (
    <section className="flex flex-col space-y-4">
      <div className="flex justify-center">
        <div className="relative w-full max-w-[400px] aspect-[5/3]">
          <Image className="object-cover" src={imageUrl} fill alt={name} />
        </div>
      </div>
      <article className="flex flex-col space-y-4">
        <h2>{name}</h2>
        <h3>{getFormattedDate(date)}</h3>
        {locationData?.location ? (
          <p>
            Location:{" "}
            <Link href={`/location/${locationId}`} className="underline">
              {locationData.location.name}
            </Link>
          </p>
        ) : null}
        <p>{description || <i>This event has no description yet.</i>}</p>
      </article>
    </section>
  );
}
