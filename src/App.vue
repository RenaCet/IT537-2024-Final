<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  padding: 1rem;
  background-color: #f8f9fa;
}
nav a {
  margin: 0 0.5rem;
  text-decoration: none;
  color: #007bff;
}
nav a:hover {
  text-decoration: underline;
}
</style>
