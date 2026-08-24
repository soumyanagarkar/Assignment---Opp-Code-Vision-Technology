export type Metric = {
  label: string;
  value: string;
  tone: "positive" | "neutral";
};

export type HistoryPoint = {
  date: string;
  price: number;
  volume: number;
};

export type FinancialRow = {
  year: string;
  revenue: number;
  profit: number;
  eps: number;
};

export type BalanceRow = {
  year: string;
  equity: number;
  reserves: number;
  debt: number;
};

export type Shareholding = {
  name: string;
  value: number;
};

export type Peer = {
  name: string;
  ticker: string;
  price: string;
  pe: string;
  roe: string;
  marketCap: string;
};

export type Analyst = {
  consensus: string;
  score: number;
  coverage: number;
  summary: string;
  bullCase: string;
  riskCase: string;
};

export type ResearchStatus = {
  status: string;
  lastReview: string;
  owner: string;
  nextReview: string;
};

export type Estimate = {
  year: string;
  revenue: string;
  ebitda: string;
  eps: string;
};

export type DocumentItem = {
  title: string;
  type: string;
  date: string;
  size: string;
};

export type Company = {
  ticker: string;
  name: string;
  exchange: string;
  sector: string;
  industry: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  lastUpdated: string;
  about: string;
  website: string;
  metrics: Metric[];
  shareholding: Shareholding[];
  financials: FinancialRow[];
  balanceSheet: BalanceRow[];
  history: HistoryPoint[];
  peers: Peer[];
  analyst: Analyst;
  researchStatus: ResearchStatus;
  estimates: Estimate[];
  documents: DocumentItem[];
};

export type CompanySearchResult = Pick<
  Company,
  "ticker" | "name" | "sector" | "industry" | "exchange"
>;
