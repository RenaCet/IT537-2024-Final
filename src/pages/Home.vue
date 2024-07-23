<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">Cryptocurrency Prices</h1>
    <div class="flex flex-col md:flex-row">
      <!-- Main Content: Cryptocurrency Prices -->
      <div class="flex-1">
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li v-for="coin in coins" :key="coin.id" class="bg-white shadow-lg rounded-lg p-6 hover:bg-gray-100 transition cursor-pointer" @click="goToDetail(coin.id)">
            <img :src="coin.image" :alt="coin.name" class="w-12 h-12 rounded-full">
            <div class="ml-4">
              <p class="text-xl font-semibold text-gray-800">{{ coin.name }}</p>
              <p class="text-gray-600">{{ coin.current_price }} USD</p>
            </div>
          </li>
        </ul>
        <div v-if="error" class="text-red-500 text-center mt-4">Error: {{ error.message }}</div>
        <div class="text-center mt-8">
          <button @click="loadMore" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">More</button>
        </div>
      </div>
      <!-- Sidebar: Additional Sections -->
      <div class="mt-6 md:mt-0 md:ml-6 md:w-1/3 space-y-6">
        <!-- Top Gainers Section -->
        <div class="bg-green-100 shadow-lg rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-white bg-green-700 p-4 rounded-t-lg">Top Gainers</h2>
          <div class="p-6">
            <ul class="space-y-4">
              <li v-for="gainer in topGainers" :key="gainer.id">
                <div class="flex items-center">
                  <img :src="gainer.image" :alt="gainer.name" class="w-10 h-10 rounded-full mr-4">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-800">{{ gainer.name }}</h3>
                    <p class="text-green-600">+{{ gainer.price_change_percentage_24h.toFixed(2) }}%</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- Top Losers Section -->
        <div class="bg-red-100 shadow-lg rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-white bg-red-700 p-4 rounded-t-lg">Top Losers</h2>
          <div class="p-6">
            <ul class="space-y-4">
              <li v-for="loser in topLosers" :key="loser.id">
                <div class="flex items-center">
                  <img :src="loser.image" :alt="loser.name" class="w-10 h-10 rounded-full mr-4">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-800">{{ loser.name }}</h3>
                    <p class="text-red-600">{{ loser.price_change_percentage_24h.toFixed(2) }}%</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCryptocurrencyPrices, getTopGainers, getTopLosers } from '../api/crypto';

export default {
  name: 'Home',
  data() {
    return {
      coins: [],
      error: null,
      page: 1,
      topGainers: [],
      topLosers: []
    };
  },
  async created() {
    try {
      this.coins = await getCryptocurrencyPrices(this.page);
      this.topGainers = await getTopGainers();
      this.topLosers = await getTopLosers();
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    async loadMore() {
      this.page += 1;
      try {
        const newCoins = await getCryptocurrencyPrices(this.page);
        this.coins = [...this.coins, ...newCoins];
      } catch (error) {
        this.error = error;
      }
    },
    goToDetail(id) {
      this.$router.push(`/crypto/${id}`);
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f4f4f9;
}
</style>
