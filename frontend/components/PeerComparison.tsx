import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function PeerComparison({
  company
}: Props) {
  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Peer Comparison</h2>
          <p>Comparison with selected industry peers</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Market Cap</th>
              <th>P/E</th>
              <th>ROE</th>
            </tr>
          </thead>

          <tbody>
            <tr className="current-company">
              <td>
                <strong>
                  {company.shortName}
                </strong>
                <small>
                  {company.ticker}
                </small>
              </td>

              <td>
                {company.overview.marketCap}
              </td>

              <td>
                {company.overview.peRatio}
              </td>

              <td>
                {company.overview.roe}
              </td>
            </tr>

            {company.peers.map((peer) => (
              <tr key={peer.ticker}>
                <td>
                  <strong>{peer.name}</strong>
                  <small>{peer.ticker}</small>
                </td>

                <td>{peer.marketCap}</td>

                <td>{peer.pe.toFixed(2)}</td>

                <td>{peer.roe.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}