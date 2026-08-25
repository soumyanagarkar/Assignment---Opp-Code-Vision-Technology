import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function KeyRatios({
  company
}: Props) {
  const ratios = [
    {
      label: "Market Cap",
      value: company.overview.marketCap
    },
    {
      label: "Enterprise Value",
      value: company.overview.enterpriseValue
    },
    {
      label: "P/E Ratio",
      value: company.overview.peRatio
    },
    {
      label: "P/B Ratio",
      value: company.overview.pbRatio
    },
    {
      label: "ROE",
      value: company.overview.roe
    },
    {
      label: "ROCE",
      value: company.overview.roce
    },
    {
      label: "Dividend Yield",
      value: company.overview.dividendYield
    },
    {
      label: "Debt / Equity",
      value: company.overview.debtToEquity
    },
    {
      label: "Book Value",
      value: company.overview.bookValue
    },
    {
      label: "Face Value",
      value: company.overview.faceValue
    }
  ];

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Key Ratios</h2>
          <p>Important valuation and performance metrics</p>
        </div>
      </div>

      <div className="ratio-grid">
        {ratios.map((ratio) => (
          <div
            className="ratio-item"
            key={ratio.label}
          >
            <span>{ratio.label}</span>
            <strong>{ratio.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}