import type {
  Company,
  CompanySearchResult
} from "@/types/company";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

async function handleResponse<T>(
  response: Response
): Promise<T> {
  if (!response.ok) {
    let message = `API Error: ${response.status}`;

    try {
      const data = await response.json();

      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Ignore JSON parsing errors
    }

    throw new Error(message);
  }

  return response.json();
}


/* ================================
   GET COMPANY
================================ */

export async function getCompany(
  ticker: string
): Promise<Company> {

  const response = await fetch(
    `${API_URL}/api/companies/${encodeURIComponent(
      ticker
    )}`,
    {
      cache: "no-store"
    }
  );

  return handleResponse<Company>(
    response
  );
}


/* ================================
   SEARCH COMPANIES
================================ */

export async function searchCompanies(
  query: string
): Promise<CompanySearchResult[]> {

  if (!query.trim()) {
    return [];
  }

  const response = await fetch(
    `${API_URL}/api/companies/search?q=${encodeURIComponent(
      query.trim()
    )}`,
    {
      cache: "no-store"
    }
  );

  return handleResponse<
    CompanySearchResult[]
  >(response);
}