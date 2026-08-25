COMPANY DETAILED VIEW

OVERVIEW

I built a responsive company research page using Next.js, React, TypeScript, and Node.js with Express.

The design is inspired by financial research platforms such as Screener.in. I used mock JSON data for this assessment and did not use any live stock market API.


FEATURES

I included the following features in the application:

- Company overview
- Current stock price
- Key financial ratios
- Shareholding pattern
- Financial statements
- Historical price and volume chart
- Peer comparison
- Analyst summary
- Research status
- Financial estimates
- Company documents
- Search by company name or ticker
- Accurate search with relevance-based results
- Debounced search
- Loading states
- Error states
- Responsive design
- Reusable React components
- TypeScript


TECHNOLOGIES USED

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

I divided the project into two main parts: Frontend and Backend.


FRONTEND

The frontend is built using Next.js, React, and TypeScript.

app/
Contains the main Next.js pages and global CSS.

components/
Contains the reusable components used to build the company dashboard.

lib/api.ts
Handles communication between the frontend and backend API.

types/
Contains TypeScript interfaces and types for company data.


MAIN FRONTEND COMPONENTS

CompanyPage
Main company detail dashboard.

CompanySearch
Allows users to search companies by name or ticker.

CompanyHeader
Displays company name, exchange, sector, price, and basic information.

KeyRatios
Displays important financial ratios.

Shareholding
Displays the company shareholding pattern.

PriceChart
Displays historical price and trading volume.

Financials
Displays financial statements and historical financial data.

PeerComparison
Compares the selected company with other companies.

AnalystSummary
Displays analyst rating, target price, and analyst consensus.

ResearchStatus
Displays research coverage and research report information.

Estimates
Displays estimated future revenue, profit, and EPS.

Documents
Displays available company reports and documents.


BACKEND

The backend is built using Node.js, Express, and TypeScript.

src/server.ts
Starts the Express server and configures the API.

src/data/companies.json
Contains all mock company data used by the application.

src/routes/
Contains API routes for retrieving company data and searching companies.

src/utils/
Contains the company search and matching logic.


DATA FLOW

The application follows this flow:

companies.json
      |
      v
Node.js + Express API
      |
      v
Frontend API Layer
      |
      v
CompanyPage
      |
      v
Reusable React Components
      |
      v
Company Dashboard


DATA SOURCE

I used mock company data stored in JSON format.

I did not use any live stock market API or external market-data service.

The JSON data contains:

- Company details
- Stock price
- Key ratios
- Shareholding
- Financial statements
- Balance sheet information
- Historical price and volume
- Peer companies
- Analyst information
- Research status
- Financial estimates
- Company documents

I kept the company information outside the frontend instead of hardcoding it into React components.

The frontend requests the required information from the Node.js and Express backend.


SETUP INSTRUCTIONS

1. Clone the Repository

I can clone the GitHub repository using:

git clone YOUR_GITHUB_REPOSITORY_URL

Then I move into the project folder:

cd company-detailed-view


2. Start the Backend

I open a terminal and move into the backend folder:

cd backend

Then I install the dependencies:

npm install

I start the backend development server using:

npm run dev

The backend runs on:

http://localhost:5000

To check whether the backend is running, I can open:

http://localhost:5000

The API should return:

{
  "success": true,
  "message": "Company API is running"
}


3. Start the Frontend

I open another terminal and move into the frontend folder:

cd frontend

Then I install the dependencies:

npm install

I start the Next.js development server using:

npm run dev

The frontend runs on:

http://localhost:3000

I can open this address in a browser to view the application.


API ENDPOINTS

Get Company Data:

GET /api/companies/:ticker

Example:

GET /api/companies/TCS


Search Companies:

GET /api/companies/search?q=query

Example:

GET /api/companies/search?q=tata


SEARCH FUNCTIONALITY

I implemented a search bar that allows users to search for companies using their company name or ticker.

Examples include:

TCS
Tata
Tata Consultancy
INFY
Infosys

I added a short debounce before sending search requests. This prevents an API request from being sent for every character typed.

The actual company matching is handled by the backend.

The backend searches the company name, short name, ticker, and aliases.

The search results are ranked according to relevance so that the most suitable results appear first.


LOADING AND ERROR HANDLING

I added loading and error handling to the application.

Loading State:

I display a loading screen while company information is being fetched from the backend.

Error State:

If the backend is unavailable or an API request fails, I display an error message and provide a retry option.

Search State:

The search interface displays:

- A searching state while the API request is running
- Matching companies when results are available
- A message when no matching companies are found


APPROACH

I used a component-based architecture for the project.

Instead of keeping the entire interface in one large component, I divided the company page into smaller reusable components.

I created separate components for company information, key ratios, shareholding, price chart, financials, peer comparison, analyst summary, research status, estimates, and documents.

I stored company information in JSON instead of hardcoding it in the frontend.

I used the Node.js and Express backend to read the JSON data and provide it through API endpoints.

The frontend fetches the data from the backend and displays it using reusable React components.

For the search functionality, I support company names, tickers, and aliases. I also added debouncing and relevance-based result ranking.

I added loading and error states so that users receive proper feedback while data is being loaded or when the backend is unavailable.

I made the layout responsive so that it works across desktop, tablet, and mobile screen sizes.


DATA

I used mock company data for this assessment.

I did not use any live stock market API.

All company information is stored locally in JSON format and served through the backend API.

The project currently contains mock data for the selected companies.

The data structure is designed so that additional companies can be added to the JSON file without changing the frontend components.

I kept the implementation simple and focused on demonstrating the requested functionality rather than production-level market-data integration.
