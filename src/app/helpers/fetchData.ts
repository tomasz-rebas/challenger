export async function fetchData(apiRoute: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${apiRoute}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}
