export const CoinsList = (currency, page) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

export const CoinDetail = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const CoinHistory = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
