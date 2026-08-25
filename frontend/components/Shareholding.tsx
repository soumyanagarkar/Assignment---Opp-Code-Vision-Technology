import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function Shareholding({
  company
}: Props) {
  const data = [
    {
      label: "Promoters",
      value: company.shareholding.promoters
    },
    {
      label: "Foreign Institutions",
      value:
        company.shareholding.foreignInstitutions
    },
    {
      label: "Domestic Institutions",
      value:
        company.shareholding.domesticInstitutions
    },
    {
      label: "Retail & Others",
      value: company.shareholding.retail
    }
  ];

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Shareholding Pattern</h2>
          <p>Latest reported ownership distribution</p>
        </div>
      </div>

      <div className="shareholding-list">
        {data.map((item) => (
          <div
            className="holding-row"
            key={item.label}
          >
            <div className="holding-top">
              <span>{item.label}</span>
              <strong>
                {item.value.toFixed(2)}%
              </strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-value"
                style={{
                  width: `${item.value}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}