import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Params, PopularEvent } from "@/app/types";
import { getFormattedDate } from "@/app/helpers/getFormattedDate";

interface Props {
  params: Params;
}

export default async function Event({ params }: Props) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/popular/${params.id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  if (!data.event) {
    notFound();
  }

  const { event }: { event: PopularEvent } = data;
  const { imageUrl, name, date, description } = event;

  return (
    <div className="flex flex-col space-y-4">
      <Link href="/" className="flex gap-1">
        <ArrowLeft />
        <span>To homepage</span>
      </Link>
      <Image
        className="object-cover"
        src={imageUrl}
        width={400}
        height={280}
        alt={name}
      />
      <h2>{name}</h2>
      <h3>{getFormattedDate(date)}</h3>
      <p>{description || <i>This event has no description yet.</i>}</p>
    </div>
  );
}
