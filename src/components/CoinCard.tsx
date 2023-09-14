import React from 'react';
import {
  Card,
  Typography
} from '@mui/material';
import { ICoin } from './interfaces/coins.interface';

const CoinCard: React.FunctionComponent<{coin: ICoin}> = ( {coin} ) => {
  return (
    <Card sx={{
      display: 'flex',
      mr: 2
    }}>
      <img
        src={coin?.image}
        alt={coin.name}
        height="30px"
      />
      <Typography sx={{ mr:2, ml: 2}}>{coin.symbol}</Typography>
      <Typography>{coin.price_change_percentage_24h_in_currency.toFixed(2)}%</Typography>
    </Card>
  )
};

export default CoinCard