import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Params } from "@/app/types";
import { fetchData } from "@/app/helpers/fetchData";

interface Props {
  params: Params;
}

export default async function Location({ params }: Props) {
  const data = await fetchData(`locations/${params.id}`);

  if (!data.location) {
    notFound();
  }

  const { location } = data;
  const { imageUrl, name, city, country } = location;

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
        unoptimized
      />
      <h2>{name}</h2>
      <h3>
        {city}, {country}
      </h3>
    </div>
  );
}
