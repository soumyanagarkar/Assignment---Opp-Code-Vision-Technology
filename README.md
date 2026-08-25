COMPANY DETAILED VIEW
=====================

I have build a responsive company research page built using Next.js, React, TypeScript, and Node.js/Express.

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

I have divided this project into two main parts: Frontend and Backend.

### Frontend

The frontend is built using Next.js, React, and TypeScript.

- `app/` - Contains the main Next.js pages and global CSS.
- `components/` - Contains reusable components used to build the company dashboard.
- `lib/api.ts` - Handles communication between the frontend and backend API.
- `types/` - Contains TypeScript interfaces and types for company data.

### Main Frontend Components

- `CompanyPage` - Main company detail dashboard.
- `CompanySearch` - Allows users to search companies by name or ticker.
- `CompanyHeader` - Displays company name, exchange, sector, price, and basic information.
- `KeyRatios` - Displays important financial ratios.
- `Shareholding` - Displays the company shareholding pattern.
- `PriceChart` - Displays historical price and trading volume.
- `Financials` - Displays financial statements and historical financial data.
- `PeerComparison` - Compares the selected company with other companies.
- `AnalystSummary` - Displays analyst rating, target price, and analyst consensus.
- `ResearchStatus` - Displays research coverage and research report information.
- `Estimates` - Displays estimated future revenue, profit, and EPS.
- `Documents` - Displays available company reports and documents.

### Backend

The backend is built using Node.js, Express, and TypeScript.

- `src/server.ts` - Starts the Express server and configures the API.
- `src/data/companies.json` - Contains all mock company data.
- `src/routes/` - Contains API routes for retrieving company data and searching companies.
- `src/utils/` - Contains the company search and matching logic.

### Data Flow

The application follows this flow:

`companies.json`
→ `Node.js + Express API`
→ `Frontend API Layer`
→ `CompanyPage`
→ `Reusable React Components`
→ `Company Dashboard`

SETUP INSTRUCTIONS
------------------

1. Clone the repository

   git clone https://github.com/soumyanagarkar/Assignment---Opp-Code-Vision-Technology.git

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


