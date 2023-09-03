import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CoinsList } from '../config/api';
import { useCrypto } from '../CryptoContext';
import { ICoin } from './interfaces/coins.interface';
import { 
  Container,
  Typography,
  TextField,
  TableContainer,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import axios from 'axios';

const tableAttritube = ['Coin', 'Price', '1h', '24h', '7d', "Mkt Cap"];

export const addComma = (num: number) =>{
  let temps = num.toString().split('.'), 
    target = temps[0].split('').reverse(), 
    lastIndex = target.length;
  return target.map((item,index) => { 
      return ((index+1) % 3 === 0 && (index !== lastIndex - 1)) ? (','+ item) : item;
  })
  .reverse()
  .join('') + (temps[1] ? '.' + temps[1] : '')
}

const Coins: React.FunctionComponent = () => {
  const [coinsList, setCoinsList] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { currency } = useCrypto();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(CoinsList(currency));
      setCoinsList(result.data);
      setLoading(false);
    };
    fetchData();
  }, [currency])

  console.log(coinsList)

  const handleSearch = () => {
    return coinsList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{ m: 2, fontFamily: 'monospace' }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search For a Crypto Currency.."
        variant="outlined"
        sx={{ mb: 2, width: '100%' }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        {loading ? (
          <CircularProgress sx={{ color: '#4eaf0a' }} />
        ) : (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableAttritube.map((tableAttritube) => (
                  <TableCell
                    sx={{
                      color: 'black',
                      fontWeight: '700',
                    }}
                    key={tableAttritube}
                    align={tableAttritube === 'Coin' ? 'left' : 'right'}
                  >
                    {tableAttritube}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
                {coinsList
                  .map((coin) => {
                    const profitList = [coin.price_change_percentage_1h_in_currency, 
                      coin.price_change_percentage_24h_in_currency, 
                      coin.price_change_percentage_7d_in_currency
                    ];
                    
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${coin.name}`)}
                        key={coin.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: 'flex',
                            gap: '15px',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                              src={coin?.image}
                              alt={coin.name}
                              height="30px"
                            />
                          </div>
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <span
                              style={{
                                fontSize: 24,
                                fontWeight: 700
                              }}
                            >
                              {coin.name}
                            </span>
                            <span style={{ color: 'darkgrey', textTransform: 'uppercase' }}>
                              {coin.symbol}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {'$'}{' '}
                          {addComma(coin.current_price)}
                        </TableCell>
                        {profitList.map((profit) => (
                          <TableCell
                            align="right"
                            style={{
                              color: (profit > 0) ? '#4eaf0a' : 'red',
                              fontWeight: 500,
                            }}
                          >
                            {(profit > 0) && '+'}
                            {profit?.toFixed(2)}%
                          </TableCell>
                        ))}
                          <TableCell align="right">
                            {`$ ${addComma(coin.market_cap)}`}
                          </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
          </Table>)}
      </TableContainer>
    </Container>
  )
};

export default Coins;