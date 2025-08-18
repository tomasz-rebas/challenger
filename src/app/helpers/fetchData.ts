const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function fetchData(apiRoute: string) {
  /**
   * In a real-world application, I wouldn't call an internal API route in a server component.
   * Since the server has a direct access to the contents of the route, it wouldn't make sense.
   *
   * Nevertheless, for the purpose of the assignment, I'm going to assume the
   * API route is just a part of the database mock - i.e. I'm going to treat
   * it as an external route.
   */
  const response = await fetch(`${BASE_URL}/api/${apiRoute}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}
