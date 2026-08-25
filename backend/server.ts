import express from "express";
import cors from "cors";

import companies from "./data/companies.json";

const app = express();

const PORT = 5000;


/* =================================
   MIDDLEWARE
================================= */

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ]
  })
);

app.use(express.json());


/* =================================
   HEALTH CHECK
================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Company API is running"
  });
});


/* =================================
   GET ALL COMPANIES
================================= */

app.get(
  "/api/companies",
  (req, res) => {

    const results = companies.map(
      (company) => ({
        ticker: company.ticker,
        name: company.name,
        shortName: company.shortName,
        exchange: company.exchange,
        sector: company.sector
      })
    );

    res.json(results);
  }
);


/* =================================
   SEARCH COMPANIES
================================= */

app.get(
  "/api/companies/search",
  (req, res) => {

    const query =
      String(req.query.q || "")
        .trim()
        .toLowerCase();

    if (!query) {
      return res.json([]);
    }

    const results = companies
      .map((company) => {

        const ticker =
          company.ticker.toLowerCase();

        const name =
          company.name.toLowerCase();

        const shortName =
          company.shortName.toLowerCase();

        const aliases =
          (company.aliases || [])
            .map((alias) =>
              alias.toLowerCase()
            );

        let score = 0;


        /* Exact ticker */

        if (ticker === query) {
          score += 1000;
        }


        /* Exact name */

        if (name === query) {
          score += 900;
        }


        /* Exact short name */

        if (shortName === query) {
          score += 850;
        }


        /* Exact alias */

        if (aliases.includes(query)) {
          score += 800;
        }


        /* Ticker starts with query */

        if (ticker.startsWith(query)) {
          score += 700;
        }


        /* Short name starts with query */

        if (
          shortName.startsWith(query)
        ) {
          score += 650;
        }


        /* Name starts with query */

        if (name.startsWith(query)) {
          score += 600;
        }


        /* Alias starts with query */

        if (
          aliases.some((alias) =>
            alias.startsWith(query)
          )
        ) {
          score += 550;
        }


        /* Name contains query */

        if (name.includes(query)) {
          score += 400;
        }


        /* Short name contains query */

        if (
          shortName.includes(query)
        ) {
          score += 350;
        }


        /* Alias contains query */

        if (
          aliases.some((alias) =>
            alias.includes(query)
          )
        ) {
          score += 300;
        }


        /* Word matching */

        const queryWords =
          query
            .split(/\s+/)
            .filter(Boolean);

        const nameWords =
          name.split(/\s+/);

        for (const word of queryWords) {

          const matched =
            nameWords.some(
              (nameWord) =>
                nameWord.startsWith(word) ||
                nameWord.includes(word)
            );

          if (matched) {
            score += 50;
          }
        }


        return {
          company,
          score
        };
      })

      .filter(
        (item) =>
          item.score > 0
      )

      .sort(
        (a, b) =>
          b.score - a.score
      )

      .map(
        (item) => ({
          ticker: item.company.ticker,
          name: item.company.name,
          shortName:
            item.company.shortName,
          exchange:
            item.company.exchange,
          sector:
            item.company.sector
        })
      );

    res.json(results);
  }
);


/* =================================
   GET SINGLE COMPANY
================================= */

app.get(
  "/api/companies/:ticker",
  (req, res) => {

    const ticker =
      req.params.ticker
        .trim()
        .toLowerCase();

    const company =
      companies.find(
        (item) =>
          item.ticker.toLowerCase() ===
          ticker
      );

    if (!company) {
      return res.status(404).json({
        message:
          "Company not found"
      });
    }

    res.json(company);
  }
);


/* =================================
   ERROR HANDLER
================================= */

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {

    console.error(err);

    res.status(500).json({
      message:
        "Internal server error"
    });
  }
);


/* =================================
   START SERVER
================================= */

app.listen(
  PORT,
  () => {
    console.log(
      `Company API running on http://localhost:${PORT}`
    );
  }
);