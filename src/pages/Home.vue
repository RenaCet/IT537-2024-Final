<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Cryptocurrency Prices</h1>
    <ul>
      <li v-for="coin in coins" :key="coin.id">{{ coin.name }}: {{ coin.current_price }} USD</li>
    </ul>
    <div v-if="error" class="text-red-500">Error: {{ error.message }}</div>
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
</style>
