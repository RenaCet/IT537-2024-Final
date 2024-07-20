<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Cryptocurrency Prices</h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li v-for="coin in coins" :key="coin.id" class="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
        <img :src="coin.image" :alt="coin.name" class="w-12 h-12 rounded-full">
        <div>
          <p class="text-xl font-semibold">{{ coin.name }}</p>
          <p class="text-gray-700">{{ coin.current_price }} USD</p>
        </div>
      </li>
    </ul>
    <div v-if="error" class="text-red-500 text-center mt-4">Error: {{ error.message }}</div>
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
    };
  },
  async created() {
    try {
      this.coins = await getCryptocurrencyPrices();
    } catch (error) {
      this.error = error;
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f4f4f9;
}
</style>
