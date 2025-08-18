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
    <div className="flex flex-col space-y-4">
      <div className="flex justify-center">
        <Image
          className="object-cover"
          src={imageUrl}
          width={400}
          height={280}
          alt={name}
        />
      </div>
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
    </div>
  );
}
