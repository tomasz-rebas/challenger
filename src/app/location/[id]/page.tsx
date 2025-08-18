import { notFound } from "next/navigation";
import Image from "next/image";
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
    <section className="flex flex-col space-y-4">
      <div className="flex justify-center">
        <Image
          className="object-cover"
          src={imageUrl}
          width={400}
          height={280}
          alt={name}
          unoptimized
        />
      </div>
      <article className="flex flex-col space-y-4">
        <h2>{name}</h2>
        <h3>
          {city}, {country}
        </h3>
      </article>
    </section>
  );
}
