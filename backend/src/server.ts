import express, { type Request, type Response } from "express";
import cors from "cors";
import companies from "./data/companies.json" with { type: "json" };

type Company = (typeof companies)[number];

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "company-detailed-view-api" });
});

app.get("/api/companies", (req: Request, res: Response) => {
  const query = String(req.query.q ?? "").trim().toLowerCase();

  const results = companies
    .filter((company) => {
      if (!query) return true;
      return (
        company.name.toLowerCase().includes(query) ||
        company.ticker.toLowerCase().includes(query)
      );
    })
    .map(({ ticker, name, sector, industry, exchange }) => ({
      ticker,
      name,
      sector,
      industry,
      exchange
    }));

  res.json({ data: results });
});

app.get("/api/companies/:ticker", (req: Request, res: Response) => {
  const ticker = req.params.ticker.toUpperCase();

  const company = companies.find((item: Company) => item.ticker === ticker);

  if (!company) {
    res.status(404).json({
      error: "Company not found",
      message: `No mock company exists for ticker ${ticker}.`
    });
    return;
  }

  res.json({ data: company });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Company API running on http://localhost:${PORT}`);
});
