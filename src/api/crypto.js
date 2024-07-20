import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptocurrencyPrices = async (page = 1, perPage = 15) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
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
