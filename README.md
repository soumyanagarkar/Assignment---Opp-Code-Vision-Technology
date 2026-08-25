COMPANY DETAILED VIEW
=====================

A responsive company research page built using Next.js, React, TypeScript, and Node.js/Express.

The design is inspired by financial research platforms such as Screener.in. The project uses mock JSON data and does not use any live stock market API.


FEATURES
--------

- Company overview
- Current stock price
- Key financial ratios
- Shareholding pattern
- Financial statements
- Historical price and volume chart
- Peer comparison
- Analyst summary
- Research status
- Estimates
- Company documents
- Search by company name or ticker
- Loading and error states
- Responsive design


TECHNOLOGIES USED
-----------------

Frontend:
- Next.js
- React
- TypeScript
- CSS
- Lucide React

Backend:
- Node.js
- Express.js
- TypeScript

Data:
- Mock JSON data
- No live market-data API


PROJECT STRUCTURE
-----------------

company-detailed-view/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
│
└── backend/
    ├── src/
    └── data/
        └── companies.json


SETUP INSTRUCTIONS
------------------

1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL

cd company-detailed-view


2. Start the Backend

Open a terminal and run:

cd backend

npm install

npm run dev

The backend will run on:

http://localhost:5000


3. Start the Frontend

Open another terminal and run:

cd frontend

npm install

npm run dev

Open the application in the browser:

http://localhost:3000


API ENDPOINTS
-------------

Get company data:

GET /api/companies/TCS


Search companies:

GET /api/companies/search?q=tata


APPROACH
--------

The application is divided into reusable React components such as CompanyHeader, KeyRatios, Shareholding, Financials, PriceChart, PeerComparison, AnalystSummary, ResearchStatus, Estimates, and Documents.

Company information is stored in JSON files instead of being hardcoded in the frontend.

The Node.js and Express backend reads the JSON data and provides it through API endpoints.

The frontend fetches the data from the backend and displays it on the company page.

The search feature supports company names and tickers. Search requests are debounced to avoid unnecessary API requests, and results are ranked based on their relevance.

Loading and error states have also been added so the user receives feedback while data is being loaded or if the backend is unavailable.

The layout is responsive and works across desktop, tablet, and mobile screen sizes.


DATA
----

This project uses mock company data for the assessment.

No live stock market API is used.

The data is stored locally in JSON format.


