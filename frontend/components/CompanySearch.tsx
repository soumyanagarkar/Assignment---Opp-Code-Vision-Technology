"use client";

import { Search, X } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
} from "react";

import type {
  CompanySearchResult,
} from "@/types/company";

type CompanySearchProps = {
  value: string;

  onChange: (
    value: string
  ) => void;

  results: CompanySearchResult[];

  loading: boolean;

  onSelect: (
    ticker: string
  ) => void;

  onClear: () => void;
};

export default function CompanySearch({
  value,
  onChange,
  results,
  loading,
  onSelect,
  onClear,
}: CompanySearchProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  /*
   * Normalize search text.
   *
   * Examples:
   *
   * "TCS"
   * "tcs"
   * "Tata Consultancy"
   * "tata-consultancy"
   *
   * are converted into a consistent format.
   */
  const normalize = (
    text: string
  ): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9\s]/g,
        ""
      )
      .replace(
        /\s+/g,
        " "
      );
  };

  /*
   * Calculate how relevant a company
   * is to the user's search.
   */
  const getSearchScore = (
    company: CompanySearchResult,
    query: string
  ): number => {
    const q = normalize(query);

    if (!q) {
      return 0;
    }

    const ticker = normalize(
      company.ticker || ""
    );

    const name = normalize(
      company.name || ""
    );

    const shortName = normalize(
      company.shortName || ""
    );

    const exchange = normalize(
      company.exchange || ""
    );

    const sector = normalize(
      company.sector || ""
    );

    const industry = normalize(
      company.industry || ""
    );

    /*
     * Exact ticker
     *
     * TCS -> TCS
     */
    if (ticker === q) {
      return 1000;
    }

    /*
     * Exact short name
     */
    if (shortName === q) {
      return 950;
    }

    /*
     * Exact company name
     */
    if (name === q) {
      return 900;
    }

    /*
     * Ticker starts with search
     *
     * TC -> TCS
     */
    if (ticker.startsWith(q)) {
      return 850;
    }

    /*
     * Short name starts with search
     */
    if (shortName.startsWith(q)) {
      return 800;
    }

    /*
     * Company name starts with search
     */
    if (name.startsWith(q)) {
      return 750;
    }

    /*
     * Company name contains search
     */
    if (name.includes(q)) {
      return 700;
    }

    /*
     * Short name contains search
     */
    if (shortName.includes(q)) {
      return 650;
    }

    /*
     * Ticker contains search
     */
    if (ticker.includes(q)) {
      return 600;
    }

    /*
     * Sector
     */
    if (sector.includes(q)) {
      return 400;
    }

    /*
     * Industry
     */
    if (industry.includes(q)) {
      return 350;
    }

    /*
     * Exchange
     */
    if (exchange.includes(q)) {
      return 300;
    }

    /*
     * Individual word matching.
     *
     * Example:
     *
     * "tata consultancy"
     *
     * matches:
     *
     * "Tata Consultancy Services Limited"
     */
    const queryWords =
      q
        .split(" ")
        .filter(Boolean);

    const searchableText = [
      ticker,
      name,
      shortName,
      exchange,
      sector,
      industry,
    ].join(" ");

    let matchedWords = 0;

    for (
      const word of queryWords
    ) {
      if (
        searchableText.includes(
          word
        )
      ) {
        matchedWords++;
      }
    }

    if (
      matchedWords > 0
    ) {
      return (
        200 +
        matchedWords * 50
      );
    }

    return 0;
  };

  /*
   * Sort API results according to relevance.
   */
  const filteredResults =
    useMemo(() => {
      const query =
        value.trim();

      if (!query) {
        return [];
      }

      return results
        .map((company) => ({
          company,
          score:
            getSearchScore(
              company,
              query
            ),
        }))
        .filter(
          (item) =>
            item.score > 0
        )
        .sort(
          (a, b) =>
            b.score -
            a.score
        )
        .map(
          (item) =>
            item.company
        )
        .slice(0, 8);
    }, [
      results,
      value,
    ]);

  /*
   * Dropdown appears when the user
   * has typed something.
   */
  const showDropdown =
    value.trim().length > 0;

  /*
   * Keep the input focused after
   * selecting a result.
   */
  const inputRef =
    useRef<HTMLInputElement>(null);

  /*
   * Handle clicks outside.
   *
   * We intentionally do NOT clear
   * the search value.
   */
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        /*
         * Do nothing.
         *
         * The parent component controls
         * the search state.
         */
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * Keyboard support.
   *
   * Enter -> select first result
   * Escape -> clear search
   */
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter" &&
      filteredResults.length > 0
    ) {
      event.preventDefault();

      onSelect(
        filteredResults[0]
          .ticker
      );

      return;
    }

    if (
      event.key === "Escape"
    ) {
      onClear();

      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="search-container"
      ref={containerRef}
    >
      {/* SEARCH ICON */}

      <Search
        className="search-icon"
        size={18}
      />

      {/* SEARCH INPUT */}

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        onKeyDown={
          handleKeyDown
        }
        placeholder="Search company or ticker..."
        autoComplete="off"
        spellCheck={false}
        aria-label="Search company"
      />

      {/* CLEAR BUTTON */}

      {value.length > 0 && (
        <button
          type="button"
          className="clear-search"
          onClick={onClear}
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}

      {/* DROPDOWN */}

      {showDropdown && (
        <div className="search-dropdown">
          {/*
           * IMPORTANT:
           *
           * While loading, NEVER show
           * "No matching company".
           *
           * This is what was causing
           * the message to flash while
           * typing.
           */}

          {loading ? (
            <div className="search-loading">
              <span className="search-loading-spinner" />

              <span>
                Searching companies...
              </span>
            </div>
          ) : filteredResults.length >
            0 ? (
            <>
              {/* RESULTS HEADER */}

              <div className="search-results-header">
                <span>
                  Companies
                </span>

                <span>
                  {
                    filteredResults.length
                  }{" "}
                  result
                  {filteredResults.length !==
                  1
                    ? "s"
                    : ""}
                </span>
              </div>

              {/* RESULTS */}

              <div className="search-results-list">
                {filteredResults.map(
                  (
                    company
                  ) => (
                    <button
                      type="button"
                      className="search-result"
                      key={
                        company.ticker
                      }
                      onClick={() =>
                        onSelect(
                          company.ticker
                        )
                      }
                    >
                      <div>
                        <strong>
                          {
                            company.name
                          }
                        </strong>

                        <small>
                          {
                            company.exchange
                          }

                          {" · "}

                          {
                            company.sector
                          }
                        </small>
                      </div>

                      <span>
                        {
                          company.ticker
                        }
                      </span>
                    </button>
                  )
                )}
              </div>
            </>
          ) : value.trim()
              .length < 2 ? (
            /*
             * For one character,
             * don't say "not found".
             */

            <div className="search-message">
              <strong>
                Keep typing...
              </strong>

              <span>
                Enter at least 2
                characters
              </span>
            </div>
          ) : (
            /*
             * Only show "No matching
             * company" AFTER loading
             * has finished.
             */

            <div className="search-message">
              <strong>
                No matching company
              </strong>

              <span>
                Try another company
                name or ticker
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}