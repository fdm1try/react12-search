export const search = async (q: string) => {
  const params = new URLSearchParams({q});
  const response = await fetch(`${import.meta.env.VITE_APP_SEARCH_URL}?${params}`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
}