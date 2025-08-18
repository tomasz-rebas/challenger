import { notFound } from "next/navigation";
import Image from "next/image";
import { Params, PopularEvent } from "@/app/types";

interface Props {
  params: Params;
}

export default async function Event({ params }: Props) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/popular/${params.id}`
  ).then((response) => response.json());

  if (!data.event) {
    notFound();
  }

  const { event }: { event: PopularEvent } = data;

  return (
    <div className="flex flex-col space-y-4">
      <Image
        className="object-cover"
        src={event.imageUrl}
        width={400}
        height={280}
        alt={event.name}
      />
      <h2>{event.name}</h2>
      <h3>{event.date}</h3>
      <p>{event.description}</p>
    </div>
  );
}
