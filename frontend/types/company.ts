export interface CompanySearchResult {
  ticker: string;
  name: string;
  sector: string;
  aliases?: string[];
}

export interface Company {
  ticker: string;
  name: string;
  shortName: string;
  exchange: string;
  sector: string;
  industry: string;
  description: string;

  price: {
    current: number;
    change: number;
    changePercent: number;
    previousClose: number;
  };

  overview: {
    marketCap: string;
    enterpriseValue: string;
    bookValue: string;
    faceValue: string;
    dividendYield: string;
    peRatio: string;
    pbRatio: string;
    roe: string;
    roce: string;
    debtToEquity: string;
  };

  shareholding: {
    promoters: number;
    foreignInstitutions: number;
    domesticInstitutions: number;
    retail: number;
  };

  financials: {
    years: string[];
    sales: number[];
    expenses: number[];
    profit: number[];
    eps: number[];
  };

  balanceSheet: {
    years: string[];
    equity: number[];
    borrowings: number[];
    cash: number[];
  };

  priceHistory: {
    date: string;
    price: number;
    volume: number;
  }[];

  peers: {
    name: string;
    ticker: string;
    marketCap: string;
    pe: number;
    roe: number;
  }[];

  analyst: {
    rating: string;
    targetPrice: number;
    upside: string;
    buy: number;
    hold: number;
    sell: number;
    summary: string;
  };

  research: {
    status: string;
    lastUpdated: string;
    researchReports: number;
  };

  estimates: {
    years: string[];
    revenue: number[];
    profit: number[];
    eps: number[];
  };

  documents: {
    title: string;
    type: string;
    date: string;
  }[];
}