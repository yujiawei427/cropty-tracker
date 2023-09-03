export interface ICoinDetail {
  id: string;
  image: IImage;
  name: string;
  description: IDescription;
  market_cap_rank: number;
  market_data: IMarketData;
}

export interface IImage {
  large: string;
  small: string;
  thumb: string;
}

export interface IDescription {
  en: string;
}

export interface IMarketCap {
  aud: number;
  usd: number;
}

export interface ICurrentPrice {
  aud: number;
  usd: number;
}

export interface IMarketData {
  market_cap: IMarketCap;
  current_price: ICurrentPrice;
}

export type ICurrentPriceType = keyof ICurrentPrice;