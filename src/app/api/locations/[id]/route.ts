import { Params } from "@/app/types";
import { database } from "@/lib/mock-db";

export async function GET(_: Request, { params }: { params: Params }) {
  const { id } = params;

  return Response.json({
    location: await database.getLocation(Number(id)),
  });
}
