export interface ICoin {
  market_cap_rank: number
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  symbol: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_24h_in_currency: number;
}

export type ICoinType = keyof ICoin;