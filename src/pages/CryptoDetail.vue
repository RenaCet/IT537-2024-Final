<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4 text-center">{{ crypto.name }}</h1>
      <div class="bg-white shadow-lg rounded-lg p-6">
        <p class="mb-4 text-xl">Current Price: {{ crypto.current_price ? crypto.current_price : 'N/A' }} USD</p>
        <p class="mb-4 text-xl">
          Price Change (24h): 
          {{ crypto.price_change_percentage_24h ? crypto.price_change_percentage_24h.toFixed(2) : 'N/A' }}%
        </p>
        <div>
          <canvas id="priceChart"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Chart } from 'chart.js/auto';
  import 'chartjs-adapter-date-fns';
  
  export default {
    name: 'CryptoDetail',
    data() {
      return {
        crypto: {},
      };
    },
    async created() {
      const cryptoId = this.$route.params.id;
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
          params: {
            vs_currency: 'usd',
            ids: cryptoId,
          },
        });
        this.crypto = response.data[0];
  
        this.loadChart(cryptoId);
      } catch (error) {
        console.error('Error fetching cryptocurrency details:', error);
      }
    },
    methods: {
      async loadChart(cryptoId) {
        try {
          const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`, {
            params: {
              vs_currency: 'usd',
              days: '7',
            },
          });
          const prices = response.data.prices.map(price => ({ x: new Date(price[0]), y: price[1] }));
  
          console.log('Price data for chart:', prices);
  
          new Chart(document.getElementById('priceChart'), {
            type: 'line',
            data: {
              datasets: [
                {
                  label: 'Price (Last 7 days)',
                  data: prices,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
              ],
            },
            options: {
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day',
                  },
                },
                y: {
                  beginAtZero: false,
                },
              },
            },
          });
        } catch (error) {
          console.error('Error fetching price chart data:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f4f4f9;
  }
  </style>
  