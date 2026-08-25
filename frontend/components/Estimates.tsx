import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function Estimates({
  company
}: Props) {
  const estimates = company.estimates;

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Estimates</h2>
          <p>Forward-looking mock estimates</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Particulars</th>

              {estimates.years.map((year) => (
                <th key={year}>{year}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Revenue</td>

              {estimates.revenue.map(
                (value, index) => (
                  <td key={index}>
                    ₹{value.toLocaleString("en-IN")} Cr
                  </td>
                )
              )}
            </tr>

            <tr>
              <td>Profit</td>

              {estimates.profit.map(
                (value, index) => (
                  <td key={index}>
                    ₹{value.toLocaleString("en-IN")} Cr
                  </td>
                )
              )}
            </tr>

            <tr>
              <td>EPS</td>

              {estimates.eps.map(
                (value, index) => (
                  <td key={index}>
                    ₹{value.toFixed(2)}
                  </td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}