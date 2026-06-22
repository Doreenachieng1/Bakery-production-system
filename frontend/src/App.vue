<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: 'Bread', prices: 60, category: 'Bakery', shelf_life: 24 },
  { id: 2, name: 'Cake', prices: 150, category: 'Bakery', shelf_life: 48 },
  { id: 3, name: 'Pastry', prices: 100, category: 'Bakery', shelf_life: 36 },
  { id: 4, name: 'Croissant', prices: 80, category: 'Bakery', shelf_life: 14 },
  { id: 5, name: 'Muffin', prices: 70, category: 'Bakery', shelf_life: 10 },
  { id: 6, name: 'Bagel', prices: 50, category: 'Bakery', shelf_life: 30 }
])

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation bar -->
    <nav class="bg-[#1A1A2E] text-white px-4 sm:px-8 py-4 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
      <span class="text-lg sm:text-xl font-bold">🍞 Bakery Production System</span>
      <div class="flex flex-wrap gap-x-5 gap-y-2 text-sm sm:text-base">
        <router-link to="/" class="text-gray-400 hover:text-[#E8541E] transition-colors">Dashboard</router-link>
        <router-link to="/products" class="text-gray-400 hover:text-[#E8541E] transition-colors">Products</router-link>
        <router-link to="/sales" class="text-gray-400 hover:text-[#E8541E] transition-colors">Sales</router-link>
        <router-link to="/login" class="text-gray-400 hover:text-[#E8541E] transition-colors">Login</router-link>
      </div>
    </nav>
    <div v-for="product in products" :key="product.id">
      <h2>{{ product.name }}</h2>
      <p>Price: KES {{ product.prices }}</p>
      <p>Category: {{ product.category }}</p>
      <p>Shelf Life: {{ product.shelf_life }} hours</p>
    </div>


    <!-- Page content -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <router-view />
    </main>
  </div>
</template>

<style>
/* Active router link styling — needs global CSS since Tailwind can't target dynamic classes easily */
.router-link-active {
  color: #E8541E !important;
  font-weight: 600;
}
</style>



