import {
  Star,
  Target
} from "lucide-react";

import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function AnalystSummary({
  company
}: Props) {
  const analyst = company.analyst;

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Analyst Summary</h2>
          <p>Mock analyst consensus</p>
        </div>
      </div>

      <div className="analyst-grid">
        <div className="rating-box">
          <Star size={20} />

          <span>Consensus</span>

          <strong>{analyst.rating}</strong>
        </div>

        <div className="target-box">
          <Target size={20} />

          <span>Target Price</span>

          <strong>
            ₹
            {analyst.targetPrice.toLocaleString(
              "en-IN"
            )}
          </strong>

          <small>
            Potential upside {analyst.upside}
          </small>
        </div>
      </div>

      <div className="consensus-bar">
        <div>
          <span>Buy</span>
          <strong>{analyst.buy}</strong>
        </div>

        <div>
          <span>Hold</span>
          <strong>{analyst.hold}</strong>
        </div>

        <div>
          <span>Sell</span>
          <strong>{analyst.sell}</strong>
        </div>
      </div>

      <p className="analyst-text">
        {analyst.summary}
      </p>
    </section>
  );
}