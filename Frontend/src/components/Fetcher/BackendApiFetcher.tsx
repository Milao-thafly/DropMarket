import { useState } from "react";
import { useEffect } from "react";

const BASE_URL = "http://localhost:3000";
export const GlobalFetch = async ({ endpoint }: { endpoint: string }) => {
  const [product, setProduct] = useState<any[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


// export const GlobalFetch = async ({ endpoint }: { endpoint: string }) => {
//   const [product, setProduct] = useState<any[]>([]);
//   const [isError, setIsError] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

  return { product, isLoading, isError };
};
export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function apiFetch<T>(
  endpoint: string,
  method: FetchMethod = "GET",
  body?: any
): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const options: RequestInit = { method, headers: { "Content-Type": "application/json" } };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erreur serveur");
  }

  return response.json();
}