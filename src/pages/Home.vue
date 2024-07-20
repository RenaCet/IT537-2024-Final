<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Cryptocurrency Prices</h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li v-for="coin in coins" :key="coin.id" class="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 cursor-pointer" @click="goToDetail(coin.id)">
        <img :src="coin.image" :alt="coin.name" class="w-12 h-12 rounded-full">
        <div>
          <p class="text-xl font-semibold">{{ coin.name }}</p>
          <p class="text-gray-700">{{ coin.current_price }} USD</p>
        </div>
      </li>
    </ul>
    <div v-if="error" class="text-red-500 text-center mt-4">Error: {{ error.message }}</div>
    <div class="text-center mt-6">
      <button @click="loadMore" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">More</button>
    </div>
  </div>
</template>

<script>
import { getCryptocurrencyPrices } from '../api/crypto';

export default {
  name: 'Home',
  data() {
    return {
      coins: [],
      error: null,
      page: 1,
    };
  },
  async created() {
    try {
      this.coins = await getCryptocurrencyPrices(this.page);
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
