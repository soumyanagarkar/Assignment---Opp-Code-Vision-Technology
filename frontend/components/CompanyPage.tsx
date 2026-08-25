"use client";

import {
  AlertCircle,
  RefreshCw
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import {
  getCompany,
  searchCompanies
} from "@/lib/api";

import type {
  Company,
  CompanySearchResult
} from "@/types/company";

import CompanySearch from "./CompanySearch";
import CompanyHeader from "./CompanyHeader";
import KeyRatios from "./KeyRatios";
import Shareholding from "./Shareholding";
import PriceChart from "./PriceChart";
import Financials from "./Financials";
import PeerComparison from "./PeerComparison";
import AnalystSummary from "./AnalystSummary";
import ResearchStatus from "./ResearchStatus";
import Estimates from "./Estimates";
import Documents from "./Documents";

export default function CompanyPage() {
  const [company, setCompany] =
    useState<Company | null>(null);

  const [search, setSearch] =
    useState("");

  const [searchResults, setSearchResults] =
    useState<CompanySearchResult[]>([]);

  const [searchLoading, setSearchLoading] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
   * Load selected company
   */
  const loadCompany = async (
    ticker: string
  ) => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getCompany(ticker);

      setCompany(data);
    } catch (err) {
      console.error(
        "Company loading error:",
        err
      );

      setError(
        "Unable to load company data. Please make sure the backend API is running."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Load default company
   */
  useEffect(() => {
    loadCompany("TCS");
  }, []);

  /*
   * Search companies
   *
   * Uses debounce so the API is not
   * called for every single keystroke.
   */
  useEffect(() => {
    const query = search.trim();

    if (!query) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    const timer = setTimeout(
      async () => {
        try {
          setSearchLoading(true);

          const results =
            await searchCompanies(query);

          setSearchResults(results);
        } catch (err) {
          console.error(
            "Search error:",
            err
          );

          setSearchResults([]);
        } finally {
          setSearchLoading(false);
        }
      },
      300
    );

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  /*
   * When user selects a company
   */
  const handleSelectCompany = async (
    ticker: string
  ) => {
    setSearch(ticker);

    await loadCompany(ticker);

    setSearch("");
    setSearchResults([]);
  };

  /*
   * Retry API request
   */
  const handleRetry = () => {
    if (company?.ticker) {
      loadCompany(company.ticker);
    } else {
      loadCompany("TCS");
    }
  };

  return (
    <main className="page">

      {/* =========================
          TOP NAVIGATION
      ========================== */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-mark">
            C
          </div>

          <div>
            <strong>
              Company Research
            </strong>

            <span>
              Indian Markets
            </span>
          </div>

        </div>

        {/* Search */}

        <CompanySearch
          value={search}
          onChange={setSearch}
          results={searchResults}
          loading={searchLoading}
          onSelect={handleSelectCompany}
          onClear={() => {
            setSearch("");
            setSearchResults([]);
          }}
        />

        {/* Mock data indicator */}

        <div className="topbar-right">
          <span className="mock-label">
            MOCK DATA
          </span>
        </div>

      </header>


      {/* =========================
          PAGE CONTENT
      ========================== */}

      <div className="page-container">

        {/* Loading */}

        {loading && (
          <LoadingState />
        )}


        {/* Error */}

        {!loading && error && (
          <ErrorState
            message={error}
            onRetry={handleRetry}
          />
        )}


        {/* Company */}

        {!loading &&
          !error &&
          company && (
            <>

              {/* =====================
                  COMPANY HEADER
              ====================== */}

              <CompanyHeader
                company={company}
              />


              {/* =====================
                  DESCRIPTION
              ====================== */}

              <div className="description-card">

                <p>
                  {company.description}
                </p>

                <div className="company-tags">

                  <span>
                    {company.sector}
                  </span>

                  <span>
                    {company.industry}
                  </span>

                  <span>
                    {company.exchange}
                  </span>

                </div>

              </div>


              {/* =====================
                  DASHBOARD
              ====================== */}

              <div className="dashboard-grid">

                {/* =================
                    MAIN COLUMN
                ================== */}

                <div className="main-column">

                  {/* Key Ratios */}

                  <KeyRatios
                    company={company}
                  />


                  {/* Historical Price */}

                  <PriceChart
                    company={company}
                  />


                  {/* Financial Statements */}

                  <Financials
                    company={company}
                  />


                  {/* Future Estimates */}

                  <Estimates
                    company={company}
                  />


                  {/* Peer Comparison */}

                  <PeerComparison
                    company={company}
                  />

                </div>


                {/* =================
                    SIDE COLUMN
                ================== */}

                <aside className="side-column">

                  {/* Shareholding */}

                  <Shareholding
                    company={company}
                  />


                  {/* Analyst Summary */}

                  <AnalystSummary
                    company={company}
                  />


                  {/* Research Status */}

                  <ResearchStatus
                    company={company}
                  />


                  {/* Documents */}

                  <Documents
                    company={company}
                  />

                </aside>

              </div>

            </>
          )}

      </div>

    </main>
  );
}


/* =====================================
   LOADING STATE
===================================== */

function LoadingState() {
  return (
    <div className="loading-page">

      <div className="loading-header skeleton" />

      <div className="loading-grid">

        <div
          className="
            skeleton
            loading-large
          "
        />

        <div
          className="
            skeleton
            loading-small
          "
        />

      </div>

      <div
        className="
          skeleton
          loading-table
        "
      />

    </div>
  );
}


/* =====================================
   ERROR STATE
===================================== */

type ErrorProps = {
  message: string;
  onRetry: () => void;
};

function ErrorState({
  message,
  onRetry
}: ErrorProps) {
  return (
    <div className="error-page">

      <AlertCircle
        size={42}
      />

      <h2>
        Something went wrong
      </h2>

      <p>
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
      >

        <RefreshCw
          size={16}
        />

        Try Again

      </button>

    </div>
  );
}