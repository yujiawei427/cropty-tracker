import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CoinsList } from '../config/api';
import { useCrypto } from '../CryptoContext';
import { ICoin, ICoinType } from './interfaces/coins.interface';
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
  TableSortLabel,
  Pagination
} from '@mui/material';
import axios from 'axios';

const tableAttritube = ['market_cap_rank', 'name', 'current_price', 'price_change_percentage_1h_in_currency', 'price_change_percentage_24h_in_currency', 'price_change_percentage_7d_in_currency', 'market_cap'];
const headToAttritube = (attritube: string) => {
  switch(attritube) {
    case 'market_cap_rank':
      return '#';
    case 'name':
      return 'Coin';
    case 'current_price':
      return 'Price';
    case 'price_change_percentage_1h_in_currency':
      return '1h';
    case 'price_change_percentage_24h_in_currency':
      return '24h';
    case 'price_change_percentage_7d_in_currency':
      return '7d';
    case 'market_cap':
      return 'Mkt Cap';
  }
}

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
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('');
  const [isDesc, setIsDesc] = useState<boolean>(true);
  const { currency } = useCrypto();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(CoinsList(currency, page));
      setCoinsList(result.data);
      setLoading(false);
    };
    fetchData();
  }, [currency, page])


  const sortByAttritube = (attritube: ICoinType, isDesc: boolean) => {
    const compareNumbers = (a: ICoin, b: ICoin) => isDesc ? (
      Number(b[attritube]) - Number(a[attritube])
    ) : (
      Number(a[attritube]) - Number(b[attritube])
    )
    return compareNumbers;
  }

  const handleSort = (tableAttritube: any) => {
    setSortBy(tableAttritube);
    (tableAttritube === sortBy) ? setIsDesc(!isDesc) : setIsDesc(true);
    const currentIsDesc =  (tableAttritube === sortBy) ? !isDesc : true
    coinsList.sort(sortByAttritube(tableAttritube, currentIsDesc));
    setCoinsList(coinsList);
  };

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
                {tableAttritube.map((tableAttritube) => {
                  return (
                    <TableCell
                      sx={{
                        color: 'black',
                        fontWeight: '700',
                      }}
                      key={tableAttritube}
                      align={tableAttritube === 'name' ? 'left' : 'right'}
                    >
                      <TableSortLabel
                        active={sortBy === tableAttritube}
                        direction={isDesc ? 'desc' : 'asc'}
                        onClick={() => handleSort(tableAttritube)}
                      >
                        {headToAttritube(tableAttritube)}
                      </TableSortLabel>
                    </TableCell>
                )})}
              </TableRow>
            </TableHead>

            <TableBody>
                {handleSearch()
                  .map((coin) => {
                    const profitList = [coin.price_change_percentage_1h_in_currency, 
                      coin.price_change_percentage_24h_in_currency, 
                      coin.price_change_percentage_7d_in_currency
                    ];
                    return (
                      <TableRow
                        key={coin.name}
                        hover
                      >
                        <TableCell align="right">
                          {coin.market_cap_rank}
                        </TableCell>
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
                            onClick={() => navigate(`/coins/${coin.id.toLowerCase()}`)}
                            style={{ display: 'flex', 
                              flexDirection: 'column',
                              cursor: 'pointer'
                            }}
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
                            sx={{
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

      <Pagination
          count={100}
          size="small"
          sx={{
            p: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 0);
          }}
        />
    </Container>
  )
};

export default Coins;