import {
  Download,
  FileText
} from "lucide-react";

import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function Documents({
  company
}: Props) {
  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Documents</h2>
          <p>Company reports and investor documents</p>
        </div>
      </div>

      <div className="documents-list">
        {company.documents.map(
          (document, index) => (
            <div
              className="document-row"
              key={`${document.title}-${index}`}
            >
              <div className="document-info">
                <div className="document-icon">
                  <FileText size={19} />
                </div>

                <div>
                  <strong>
                    {document.title}
                  </strong>

                  <small>
                    {document.type} ·{" "}
                    {document.date}
                  </small>
                </div>
              </div>

              <button
                type="button"
                aria-label={`Download ${document.title}`}
              >
                <Download size={17} />
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
}