import {
  CheckCircle2,
  FileSearch
} from "lucide-react";

import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function ResearchStatus({
  company
}: Props) {
  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Research Status</h2>
          <p>Coverage and research activity</p>
        </div>
      </div>

      <div className="research-grid">
        <div className="research-status">
          <CheckCircle2 size={20} />

          <span>Status</span>

          <strong>
            {company.research.status}
          </strong>
        </div>

        <div className="research-status">
          <FileSearch size={20} />

          <span>Research Reports</span>

          <strong>
            {company.research.researchReports}
          </strong>
        </div>

        <div className="research-status">
          <span>Last Updated</span>

          <strong>
            {company.research.lastUpdated}
          </strong>
        </div>
      </div>
    </section>
  );
}