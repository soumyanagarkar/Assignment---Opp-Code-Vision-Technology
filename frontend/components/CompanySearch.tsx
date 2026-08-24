use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CompanySearchResult } from "@/types/company";

type Props = {
  value: string;
  onChange: (value: string) => void;
  results: CompanySearchResult[];
  loading: boolean;
  onSelect: (ticker: string) => void;
  onClear: () => void;
};

export default function CompanySearch({
  value,
  onChange,
  results,
  loading,
  onSelect,
  onClear
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="search-wrap" ref={ref}>
      <Search size={18} className="search-icon" />
      <input
        value={value}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        placeholder="Search company or ticker..."
        aria-label="Search company or ticker"
      />
      {value && (
        <button className="icon-button" onClick={onClear} aria-label="Clear search">
          <X size={16} />
        </button>
      )}

      {open && value.length > 0 && (
        <div className="search-results">
          {loading && <div className="search-state">Searching...</div>}
          {!loading && results.length === 0 && (
            <div className="search-state">No matching company</div>
          )}
          {!loading &&
            results.map((company) => (
              <button
                key={company.ticker}
                className="search-result"
                onClick={() => {
                  onSelect(company.ticker);
                  setOpen(false);
                }}
              >
                <span>
                  <strong>{company.name}</strong>
                  <small>{company.sector}</small>
                </span>
                <b>{company.ticker}</b>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
