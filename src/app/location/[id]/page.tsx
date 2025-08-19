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
    <article className="flex flex-col space-y-4">
      <div className="flex justify-center">
        <div className="relative w-full max-w-[400px] aspect-[5/3]">
          <Image
            className="object-cover"
            src={imageUrl}
            alt={name}
            fill
            unoptimized
          />
        </div>
      </div>
      <h1 className="text-xl">{name}</h1>
      <h2>
        {city}, {country}
      </h2>
    </article>
  );
}
