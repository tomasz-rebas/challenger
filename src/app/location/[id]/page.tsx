import { notFound } from "next/navigation";
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

  return <div>Location specific details: {location.name}</div>;
}
