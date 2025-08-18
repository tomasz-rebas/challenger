import { database } from "@/lib/mock-db";

export async function GET() {
  return Response.json({
    events: await database.getPopularEvents(),
  });
}
