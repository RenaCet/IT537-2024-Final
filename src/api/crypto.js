import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptocurrencyPrices = async (page = 1, perPage = 15) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency prices:', error);
    throw error;
  }
};

export const getTopGainers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'percent_change_24h_desc',
        per_page: 5,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top gainers:', error);
    throw error;
  }
};

export const getTopLosers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'percent_change_24h_asc',
        per_page: 5,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top losers:', error);
    throw error;
  }
};

export const getCryptoMarketNews = async () => {
  try {
    const response = await axios.get('https://cryptonews-api.com/api/v1?tickers=BTC,ETH&items=5&token=YOUR_API_KEY');
    return response.data.news;
  } catch (error) {
    console.error('Error fetching crypto market news:', error);
    throw error;
  }
};
