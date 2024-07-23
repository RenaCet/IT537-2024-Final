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

export const getTopGainersAndLosers = async () => {
  try {
    const responseToday = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
      },
    });
    
    const responseYesterday = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        price_change_percentage: '24h',
      },
    });

    const todayData = responseToday.data;
    const yesterdayData = responseYesterday.data;
    
    const gainersAndLosers = todayData.map((coin, index) => {
      const yesterdayCoin = yesterdayData.find(y => y.id === coin.id);
      const priceChangePercentage = ((coin.current_price - yesterdayCoin.current_price) / yesterdayCoin.current_price) * 100;
      return {
        ...coin,
        price_change_percentage_24h: priceChangePercentage,
      };
    });

    const topGainers = gainersAndLosers.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 5);
    const topLosers = gainersAndLosers.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 5);

    return { topGainers, topLosers };
  } catch (error) {
    console.error('Error fetching gainers and losers:', error);
    throw error;
  }
};
