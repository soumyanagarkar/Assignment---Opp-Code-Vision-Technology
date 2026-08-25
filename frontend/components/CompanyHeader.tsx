import {
  Building2,
  Globe,
  TrendingDown,
  TrendingUp
} from "lucide-react";

import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function CompanyHeader({
  company
}: Props) {
  const positive =
    company.price.change >= 0;

  return (
    <section className="company-header">
      <div className="company-title">
        <div className="company-logo">
          <Building2 size={28} />
        </div>

        <div>
          <div className="company-name-row">
            <h1>{company.name}</h1>

            <span className="exchange-badge">
              {company.exchange}
            </span>
          </div>

          <p>
            {company.ticker} · {company.sector}
          </p>
        </div>
      </div>

      <div className="company-price">
        <div className="current-price">
          ₹{company.price.current.toLocaleString("en-IN")}
        </div>

        <div
          className={
            positive
              ? "price-change positive"
              : "price-change negative"
          }
        >
          {positive ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}

          {positive ? "+" : ""}
          {company.price.change.toFixed(2)}
          {" "}
          ({positive ? "+" : ""}
          {company.price.changePercent.toFixed(2)}%)
        </div>
      </div>

      <div className="company-actions">
        <button type="button">
          Add to watchlist
        </button>

        <button type="button">
          <Globe size={15} />
          NSE
        </button>
      </div>
    </section>
  );
}