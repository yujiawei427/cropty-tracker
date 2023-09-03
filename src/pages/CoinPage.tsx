import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCrypto } from '../CryptoContext';
import { CoinDetail } from "../config/api";
import axios from "axios";
import { ICoinDetail, ICurrentPriceType } from '../components/interfaces/coinDetail.interface';
import CoinChart from '../components/CoinChart';
import { addComma } from "../components/Coins";
import { 
  Typography,
  Box,
} from '@mui/material';


const CoinPage: React.FunctionComponent = () => {
  const { id } = useParams<string>();
  const [coin, setCoin] = useState<ICoinDetail>();
  const { currency } = useCrypto();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(CoinDetail(id));
      setCoin(result.data);
    };
    fetchData();
  }, [id])

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: {xs: 'column', md: 'row'},
        alignItems: 'center',
        mt: 5
    }}>
      <Box 
        sx={{
          width: {xs: '100vw', md: '40vw'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: {xs: 3, md: 0}
      }}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 16, marginTop: 32 }}
        />
        <Typography 
          variant="h3" 
          sx={{
            fontWeight: "bold",
            mb: 2,
            pt: 3,
          }}>
          {coin?.name}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 1
          }}
        >
          {`Rank: ${coin?.market_cap_rank}`}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 1
          }}
        >
          {`Current Price: $ ${addComma(Number(coin?.market_data.current_price[currency.toLowerCase() as ICurrentPriceType] as number))}`}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 1
          }}
        >
          {`Market Cap: $ ${addComma(Number(coin?.market_data.market_cap[currency.toLowerCase() as ICurrentPriceType] as number))}`}
        </Typography>
      </Box>
      <CoinChart id={id as string}></CoinChart>
    </Box>
  )


};

export default CoinPage;