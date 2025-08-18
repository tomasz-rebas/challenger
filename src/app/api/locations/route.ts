import { database } from "@/lib/mock-db";

export async function GET() {
  return Response.json({
    locations: await database.getLocations(),
  });
}
