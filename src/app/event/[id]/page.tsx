import { Params } from "@/app/types";
import { notFound } from "next/navigation";

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

  return <div>Event details {data.event.name}</div>;
}
