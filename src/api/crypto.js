import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptocurrencyPrices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency prices:', error);
    throw error;
  }
};
