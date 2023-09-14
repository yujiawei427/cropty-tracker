import React, { useState, useEffect } from 'react';
import { useCrypto } from '../CryptoContext';
import { CoinHistory } from "../config/api";
import axios from "axios";
import { ICoinChart, ICoinData } from './interfaces/coinChart.interface';
import { 
  Button,
  Box,
} from '@mui/material';
import dataLabel from '../config/dataLabel';
import { Line } from "react-chartjs-2";

const CoinChart: React.FunctionComponent<ICoinChart> = ( { id } ) => {
  const [coinData, setCoinData] = useState<ICoinData>();
  const [days, setDays] = useState<number>(1);
  const { currency } = useCrypto();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(CoinHistory(id, days, currency));
      setCoinData(result.data.prices);
    };
    fetchData();
  }, [currency, days])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: {xs: '100vw', md: '60vw'},
        height: '100%',
        mb: {xs: 5, md: 0},
    }}>
      <Line
        data={{
          labels: coinData?.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),

          datasets: [
            {
              data: coinData?.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {dataLabel.map((day) => (
          <Button
            key={day.value}
            onClick={() => {setDays(day.value);
            }}
            sx={{
              color: (days === day.value) ? 'white' : 'black',
              backgroundColor: (days === day.value) ? '#8DC647' : '#f9f9f9'
            }}

          >
            {day.label}
          </Button>
        ))}
      </div>
    </Box>
  )
};

export default CoinChart;