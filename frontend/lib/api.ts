import type { Company, CompanySearchResult } from "@/types/company";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type ApiResponse<T> = { data: T };

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed with ${response.status}`);
  }

  const json = (await response.json()) as ApiResponse<T>;
  return json.data;
}

export function getCompany(ticker: string) {
  return request<Company>(`/companies/${encodeURIComponent(ticker)}`);
}

export function searchCompanies(query: string) {
  return request<CompanySearchResult[]>(
    `/companies?q=${encodeURIComponent(query)}`
  );
}
