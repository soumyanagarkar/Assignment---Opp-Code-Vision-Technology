import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

function formatNumber(
  value: number
) {
  return value.toLocaleString("en-IN");
}

export default function Financials({
  company
}: Props) {
  const financials = company.financials;

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Financial Statements</h2>
          <p>Historical financial performance</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Particulars</th>

              {financials.years.map((year) => (
                <th key={year}>{year}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Sales</td>

              {financials.sales.map(
                (value, index) => (
                  <td key={index}>
                    ₹{formatNumber(value)} Cr
                  </td>
                )
              )}
            </tr>

            <tr>
              <td>Expenses</td>

              {financials.expenses.map(
                (value, index) => (
                  <td key={index}>
                    ₹{formatNumber(value)} Cr
                  </td>
                )
              )}
            </tr>

            <tr className="highlight-row">
              <td>Profit</td>

              {financials.profit.map(
                (value, index) => (
                  <td key={index}>
                    ₹{formatNumber(value)} Cr
                  </td>
                )
              )}
            </tr>

            <tr>
              <td>EPS</td>

              {financials.eps.map(
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

      <div className="subsection-title">
        Balance Sheet
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Particulars</th>

              {company.balanceSheet.years.map(
                (year) => (
                  <th key={year}>{year}</th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Equity</td>

              {company.balanceSheet.equity.map(
                (value, index) => (
                  <td key={index}>
                    ₹{formatNumber(value)} Cr
                  </td>
                )
              )}
            </tr>

            <tr>
              <td>Borrowings</td>

              {company.balanceSheet.borrowings.map(
                (value, index) => (
                  <td key={index}>
                    ₹{formatNumber(value)} Cr
                  </td>
                )
              )}
            </tr>

            <tr>
              <td>Cash & Equivalents</td>

              {company.balanceSheet.cash.map(
                (value, index) => (
                  <td key={index}>
                    ₹{formatNumber(value)} Cr
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