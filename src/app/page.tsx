import { PopularEvent } from "@/app/types";
import { Logo } from "./components/Logo";
import { PopularEvents } from "./components/PopularEvents";

export default async function Home() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/popular?amount=6`
  ).then((response) => response.json());

  return (
    <main className="max-w-3xl mx-auto p-4 my-4 grid gap-5">
      <div className="grid gap-3">
        <Logo />
      </div>
      <PopularEvents
        events={data.events.map((event: PopularEvent) => {
          return {
            ...event,
            date: new Date(event.date).toLocaleDateString(),
          };
        })}
      />
    </main>
  );
}
