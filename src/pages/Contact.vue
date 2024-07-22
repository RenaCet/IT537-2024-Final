<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4 text-center">Contact Us</h1>
    <div class="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700" for="name">Name</label>
          <input id="name" name="name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
          <input id="email" name="email" type="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700" for="message">Message</label>
          <textarea id="message" name="message" rows="4" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Send Message</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f4f4f9;
}
</style>
