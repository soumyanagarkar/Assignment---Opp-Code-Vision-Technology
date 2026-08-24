use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Building2,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  IndianRupee,
  LineChart as LineChartIcon,
  Search,
  ShieldCheck,
  Star,
  Users,
  WalletCards
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CompanySearch from "@/components/CompanySearch";
import PriceChart from "@/components/PriceChart";
import Section from "@/components/Section";
import ShareholdingChart from "@/components/ShareholdingChart";
import { getCompany, searchCompanies } from "@/lib/api";
import type { Company, CompanySearchResult } from "@/types/company";

const DEFAULT_TICKER = "INFY";

function formatNumber(value: number) {
  return value.toLocaleString("en-IN", { maximumFractionDigits: 1 });
}

function Skeleton() {
  return (
    <div className="page-shell">
      <div className="skeleton hero-skeleton" />
      <div className="skeleton-grid">
        <div className="skeleton block-skeleton" />
        <div className="skeleton block-skeleton" />
        <div className="skeleton block-skeleton wide" />
      </div>
    </div>
  );
}

export default function CompanyPage() {
  const [ticker, setTicker] = useState(DEFAULT_TICKER);
  const [company, setCompany] = useState<Company | null>(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError("");

    getCompany(ticker)
      .then((data) => {
        if (!cancelled) setCompany(data);
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setCompany(null);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [ticker]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!search.trim()) {
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }

      setSearchLoading(true);
      searchCompanies(search)
        .then(setSearchResults)
        .catch(() => setSearchResults([]))
        .finally(() => setSearchLoading(false));
    }, 250);

    return () => window.clearTimeout(timer);
  }, [search]);

  const yearlyGrowth = useMemo(() => {
    if (!company || company.financials.length < 2) return 0;
    const first = company.financials[company.financials.length - 2].revenue;
    const last = company.financials[company.financials.length - 1].revenue;
    return ((last - first) / first) * 100;
  }, [company]);

  if (loading) return <Skeleton />;

  if (error || !company) {
    return (
      <main className="app">
        <header className="topbar">
          <div className="brand"><span className="brand-mark">CV</span><span>CompanyView</span></div>
          <CompanySearch
            value={search}
            onChange={setSearch}
            results={searchResults}
            loading={searchLoading}
            onSelect={setTicker}
            onClear={() => setSearch("")}
          />
        </header>
        <div className="error-card">
          <div className="error-icon">!</div>
          <h2>Unable to load company</h2>
          <p>{error || "The company could not be loaded."}</p>
          <button className="primary-button" onClick={() => setTicker(DEFAULT_TICKER)}>
            Back to Infosys
          </button>
        </div>
      </main>
    );
  }

  const positive = company.change >= 0;

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">CV</span>
          <span>CompanyView</span>
        </div>

        <nav className="topnav">
          <span>Markets</span>
          <span>Watchlist</span>
          <span>Research</span>
        </nav>

        <CompanySearch
          value={search}
          onChange={setSearch}
          results={searchResults}
          loading={searchLoading}
          onSelect={(selected) => {
            setTicker(selected);
            setSearch("");
          }}
          onClear={() => setSearch("")}
        />
      </header>

      <div className="page-shell">
        <div className="breadcrumb">Markets / NSE / {company.ticker}</div>

        <section className="company-hero">
          <div className="company-title">
            <div className="company-logo">{company.ticker.slice(0, 2)}</div>
            <div>
              <div className="title-row">
                <h1>{company.name}</h1>
                <span className="exchange-badge">{company.exchange}</span>
              </div>
              <p>{company.ticker} · {company.sector} · {company.industry}</p>
            </div>
          </div>

          <div className="price-box">
            <div className="price">₹{company.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
            <div className={positive ? "positive price-change" : "negative price-change"}>
              {positive ? <ArrowUpRight size={17} /> : <ArrowDownRight size={17} />}
              {positive ? "+" : ""}{company.change.toFixed(2)} ({positive ? "+" : ""}{company.changePercent.toFixed(2)}%)
            </div>
            <small>{company.lastUpdated}</small>
          </div>
        </section>

        <div className="action-row">
          <button className="secondary-button"><Star size={16} /> Add to watchlist</button>
          <a className="secondary-button" href={company.website} target="_blank" rel="noreferrer">
            <Globe2 size={16} /> Website <ExternalLink size={13} />
          </a>
          <span className="market-cap"><IndianRupee size={15} /> Market cap {company.marketCap}</span>
        </div>

        <div className="tabs">
          <a className="active">Overview</a>
          <a>Financials</a>
          <a>Shareholding</a>
          <a>Peers</a>
          <a>Research</a>
          <a>Documents</a>
        </div>

        <Section title="Company overview" action={<span className="muted">Fundamentals</span>}>
          <div className="overview-grid">
            <div className="about-card">
              <div className="card-icon"><Building2 size={18} /></div>
              <h3>About the company</h3>
              <p>{company.about}</p>
              <div className="meta-row">
                <span>Sector</span><strong>{company.sector}</strong>
                <span>Industry</span><strong>{company.industry}</strong>
              </div>
            </div>

            <div className="ratio-card">
              <div className="ratio-card-head">
                <h3>Key ratios</h3>
                <span>Latest</span>
              </div>
              <div className="ratio-grid">
                {company.metrics.map((metric) => (
                  <div className="ratio" key={metric.label}>
                    <span>{metric.label}</span>
                    <strong className={metric.tone === "positive" ? "positive" : ""}>{metric.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <div className="two-col">
          <Section title="Historical price" action={<button className="range-button">1M <ChevronDown size={14} /></button>}>
            <div className="chart-header">
              <div>
                <span className="muted">Closing price</span>
                <strong>₹{company.history[company.history.length - 1].price.toLocaleString("en-IN")}</strong>
              </div>
              <div className="chart-stat">
                <LineChartIcon size={17} />
                <span>25 sessions</span>
              </div>
            </div>
            <PriceChart data={company.history} />
          </Section>

          <Section title="Shareholding pattern" action={<span className="muted">Latest quarter</span>}>
            <ShareholdingChart data={company.shareholding} />
          </Section>
        </div>

        <Section title="Financial statements" action={<button className="range-button">Annual <ChevronDown size={14} /></button>}>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Particulars</th>
                  {company.financials.map((row) => <th key={row.year}>{row.year}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Revenue (₹ Cr)</td>
                  {company.financials.map((row) => <td key={row.year}>{formatNumber(row.revenue)}</td>)}
                </tr>
                <tr>
                  <td>Net profit (₹ Cr)</td>
                  {company.financials.map((row) => <td key={row.year}>{formatNumber(row.profit)}</td>)}
                </tr>
                <tr>
                  <td>EPS (₹)</td>
                  {company.financials.map((row) => <td key={row.year}>{row.eps.toFixed(1)}</td>)}
                </tr>
                <tr className="highlight-row">
                  <td>Revenue growth</td>
                  {company.financials.map((row, index) => {
                    const previous = company.financials[index - 1];
                    const growth = previous ? ((row.revenue - previous.revenue) / previous.revenue) * 100 : null;
                    return <td key={row.year}>{growth === null ? "—" : `${growth.toFixed(1)}%`}</td>;
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="subtable-title">Balance sheet snapshot</div>
          <div className="table-scroll">
            <table className="data-table compact">
              <thead>
                <tr>
                  <th>Particulars</th>
                  {company.balanceSheet.map((row) => <th key={row.year}>{row.year}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr><td>Equity (₹ Cr)</td>{company.balanceSheet.map((r) => <td key={r.year}>{formatNumber(r.equity)}</td>)}</tr>
                <tr><td>Reserves (₹ Cr)</td>{company.balanceSheet.map((r) => <td key={r.year}>{formatNumber(r.reserves)}</td>)}</tr>
                <tr><td>Debt (₹ Cr)</td>{company.balanceSheet.map((r) => <td key={r.year}>{formatNumber(r.debt)}</td>)}</tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Peer comparison" action={<span className="muted">Selected sector peers</span>}>
          <div className="table-scroll">
            <table className="data-table peer-table">
              <thead>
                <tr>
                  <th>Company</th><th>Price</th><th>P/E</th><th>ROE</th><th>Market cap</th>
                </tr>
              </thead>
              <tbody>
                <tr className="current-company">
                  <td><strong>{company.name}</strong><span>{company.ticker}</span></td>
                  <td>₹{company.price.toLocaleString("en-IN")}</td>
                  <td>{company.metrics[0].value}</td>
                  <td>{company.metrics[2].value}</td>
                  <td>{company.marketCap}</td>
                </tr>
                {company.peers.map((peer) => (
                  <tr key={peer.ticker}>
                    <td><strong>{peer.name}</strong><span>{peer.ticker}</span></td>
                    <td>{peer.price}</td><td>{peer.pe}</td><td>{peer.roe}</td><td>{peer.marketCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <div className="three-col">
          <Section title="Analyst summary">
            <div className="analyst-score">
              <div className="score-circle">{company.analyst.score}</div>
              <div>
                <strong>{company.analyst.consensus}</strong>
                <span>{company.analyst.coverage} analysts covered</span>
              </div>
            </div>
            <p className="summary-text">{company.analyst.summary}</p>
            <div className="case"><span>Upside case</span><p>{company.analyst.bullCase}</p></div>
            <div className="case risk"><span>Key risk</span><p>{company.analyst.riskCase}</p></div>
          </Section>

          <Section title="Research status">
            <div className="status-card">
              <div className="status-badge"><ShieldCheck size={16} /> {company.researchStatus.status}</div>
              <div className="status-list">
                <span>Last review</span><strong>{company.researchStatus.lastReview}</strong>
                <span>Owner</span><strong>{company.researchStatus.owner}</strong>
                <span>Next review</span><strong>{company.researchStatus.nextReview}</strong>
              </div>
            </div>
          </Section>

          <Section title="Estimates">
            <div className="estimate-list">
              {company.estimates.map((estimate) => (
                <div className="estimate" key={estimate.year}>
                  <strong>{estimate.year}</strong>
                  <span>Revenue {estimate.revenue}</span>
                  <span>EBITDA {estimate.ebitda}</span>
                  <b>EPS {estimate.eps}</b>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <Section title="Documents" action={<span className="muted">Mock research library</span>}>
          <div className="documents-grid">
            {company.documents.map((document) => (
              <div className="document-card" key={document.title}>
                <div className="document-icon"><FileText size={20} /></div>
                <div className="document-info">
                  <strong>{document.title}</strong>
                  <span>{document.type} · {document.date}</span>
                  <small>{document.size}</small>
                </div>
                <button className="download-button" title="Mock document action" aria-label={`Download ${document.title}`}>
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </Section>

        <footer>
          <span>CompanyView · Assessment build</span>
          <span>All data is fictional mock data. Not investment advice.</span>
        </footer>
      </div>
    </main>
  );
}
