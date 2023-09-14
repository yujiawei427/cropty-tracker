import React from 'react';
import {
  Card,
  Typography
} from '@mui/material';
import { ICoin } from './interfaces/coins.interface';

const CoinCard: React.FunctionComponent<ICoin> = (coin) => {
  return (
    <Card sx={{
      display: 'flex',
    }}>
      <img
        src={coin?.image}
        alt={coin.name}
        height="30px"
      />
      <Typography>{coin.symbol}</Typography>
      <Typography>{coin.price_change_percentage_24h_in_currency}</Typography>
    </Card>
  )
};

export default CoinCard