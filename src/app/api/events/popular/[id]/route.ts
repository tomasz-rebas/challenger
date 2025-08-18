import { database } from "@/lib/mock-db";

interface Params {
  id: string;
}

export async function GET(_: Request, { params }: { params: Params }) {
  const { id } = params;

  return Response.json({
    events: await database.getEvent(Number(id)),
  });
}
