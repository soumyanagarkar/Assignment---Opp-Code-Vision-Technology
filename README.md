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

\section{Project Structure}

The project is divided into two main parts: the frontend and the backend.

\subsection{Frontend}

\begin{center}
\begin{tabular}{|p{4.2cm}|p{8.5cm}|}
\hline
\textbf{Folder / File} & \textbf{Purpose} \\
\hline
\texttt{frontend/app/} & Main Next.js application pages and global styles. \\
\hline
\texttt{frontend/components/} & Reusable React components for the company dashboard. \\
\hline
\texttt{frontend/lib/api.ts} & Handles communication between the frontend and backend API. \\
\hline
\texttt{frontend/types/} & Contains TypeScript interfaces and data types. \\
\hline
\end{tabular}
\end{center}

\subsection{Backend}

\begin{center}
\begin{tabular}{|p{4.2cm}|p{8.5cm}|}
\hline
\textbf{Folder / File} & \textbf{Purpose} \\
\hline
\texttt{backend/src/server.ts} & Starts the Node.js and Express server. \\
\hline
\texttt{backend/src/data/companies.json} & Stores all mock company data in JSON format. \\
\hline
\texttt{backend/src/routes/} & Contains API routes for company data and search. \\
\hline
\texttt{backend/src/utils/} & Contains company search and matching logic. \\
\hline
\end{tabular}
\end{center}

\subsection{Main Components}

\begin{itemize}
    \item \textbf{CompanyPage} -- Main company dashboard.
    \item \textbf{CompanySearch} -- Search company by name or ticker.
    \item \textbf{CompanyHeader} -- Displays company overview and current price.
    \item \textbf{KeyRatios} -- Displays important financial ratios.
    \item \textbf{Shareholding} -- Shows the shareholding pattern.
    \item \textbf{PriceChart} -- Displays historical price and volume.
    \item \textbf{Financials} -- Displays financial statements.
    \item \textbf{PeerComparison} -- Compares the company with its peers.
    \item \textbf{AnalystSummary} -- Displays analyst ratings and target price.
    \item \textbf{ResearchStatus} -- Displays research coverage information.
    \item \textbf{Estimates} -- Displays future financial estimates.
    \item \textbf{Documents} -- Displays available company documents.
\end{itemize}

\subsection{Data Flow}

\begin{center}
\texttt{companies.json}
$\rightarrow$
\texttt{Express API}
$\rightarrow$
\texttt{api.ts}
$\rightarrow$
\texttt{CompanyPage}
$\rightarrow$
\texttt{Reusable Components}
\end{center}

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


