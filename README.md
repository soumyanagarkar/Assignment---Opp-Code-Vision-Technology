# Company Detailed View

Technical assessment implementation using Next.js, React, TypeScript and a small Node/Express API.

## Features

- Responsive listed-company detail page inspired by the information density and layout patterns of Screener.in.
- Company overview and current snapshot.
- Key ratios.
- Shareholding pattern.
- Profit & loss and balance sheet statements.
- Historical price/volume chart.
- Peer comparison.
- Analyst summary.
- Research status.
- Estimates.
- Documents.
- Search by company name or ticker.
- Loading, empty and API error states.
- Mock JSON data only; no live market-data API.
- Reusable TypeScript React components.
- Express API with company list, search and company detail endpoints.

## Project structure

```text
company-detailed-view/
├── frontend/              # Next.js App Router application
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
├── backend/               # Node + Express + TypeScript API
│   └── src/
├── .gitignore
└── README.md
```

## Requirements

- Node.js 20.9+ recommended.
- npm.

Next.js currently recommends Node.js 20.9+ for its App Router learning stack.

## Run locally

### 1. Start the API

```bash
cd backend
npm install
npm run dev
```

API runs on `http://localhost:4000`.

### 2. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

The frontend reads `NEXT_PUBLIC_API_URL` and defaults to `http://localhost:4000/api`.

To override it:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## API

- `GET /api/health`
- `GET /api/companies`
- `GET /api/companies?q=infosys`
- `GET /api/companies/:ticker`

Examples:

```text
GET http://localhost:4000/api/companies?q=INFY
GET http://localhost:4000/api/companies/INFY
```

## Mock data

The API data is in:

`backend/src/data/companies.json`

No live market-data provider is used.

## Design approach

The page uses a dashboard-style information hierarchy:

1. Search and navigation.
2. Company identity and price snapshot.
3. Overview and key ratios.
4. Price/volume visualization.
5. Financial statements.
6. Shareholding and peers.
7. Analyst/research information.
8. Estimates.
9. Documents.

The UI is intentionally assessment-friendly: clean, compact, readable, responsive, and easy to extend.

## Suggested meaningful Git commits

```text
feat: scaffold Next.js frontend and Express API
feat: add mock company data and search endpoints
feat: build company overview and ratios
feat: add historical price volume chart
feat: add financials shareholding and peer comparison
feat: add analyst research estimates and documents
feat: add loading error and responsive states
docs: add setup and implementation notes
```

## Notes

This is an assessment exercise. All figures, analyst comments, estimates and documents are fictional mock data and must not be treated as investment advice.
