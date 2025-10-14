const API_URL = "http://localhost:3000";

export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function apiFetch<T>(
  endpoint: string,
  method: FetchMethod = "GET",
  body?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erreur serveur");
  }

  return response.json();
}
