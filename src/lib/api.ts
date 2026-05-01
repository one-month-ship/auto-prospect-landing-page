const API_URL = import.meta.env.VITE_API_URL ?? "https://api.auto-prospect.fr";

export async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
