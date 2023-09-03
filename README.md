# Crypto Tracker

This project is for presenting the market data of cryptocurrencies into table through (https://api.coingecko.com/api/v3) provided by CoinGecko API.

## Features

After the page is loaded, the results are returned in 100 per page. You can use the pagination button at the bottom of the page to see more results.

SearchBar can be used to filter the cryptocurrency by its name/symbol.

Currency Type is changeable in USD/AUD at the right of Header Bar.

Table Head is clickable to sort the result in asc/desc order.

You can get a more detailed view of the certain Cryptocurrency by clicking on the Coin name.

There is a line graph in detailed coin page to display the trend of the price of the cryptocurrency.

## Available Scripts

In the project directory, you can run:

### `npm install`

To install dependencies the project needed before runing the whole project, it may take a while.

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner and run all the tests.


## Main Tech Stacks used

### React

To construct UI components

### Material Ui 

To help us to import and use different components in a faster way insteading to write everything from scratch

### Chart JS

To generate the historical chart with your selected period(1day/1month/3month/1year) to see the historical data in line graph

### Jest/Enzyme

To run tests and provide test coverage