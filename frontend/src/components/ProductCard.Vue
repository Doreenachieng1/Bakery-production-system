<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-active','sell'])

const badge = computed(() => {
  const h = props.product.shelf_life_hours || 0
  if (h <= 12) return { text: 'Urgent Sale', cls: 'bg-red-100 text-red-700' }
  if (h <= 48) return { text: 'Fast Seller', cls: 'bg-yellow-100 text-yellow-700' }
  return { text: 'Long Shelf Life', cls: 'bg-green-100 text-green-700' }
})

const toggleActive = () => emit('toggle-active', props.product)
const sell = () => emit('sell', props.product)
</script>

<template>
  <div class="product-card p-3 rounded bg-white shadow">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-bold">{{ product.name }}</h3>
        <p class="text-sm">KES {{ product.selling_price }}</p>
      </div>
      <div class="text-right">
        <span :class="badge.cls + ' px-2 py-1 rounded text-xs'">{{ badge.text }}</span>
      </div>
    </div>

    <div class="mt-3 flex gap-2">
      <button @click="sell" class="text-sm bg-blue-500 text-white px-3 py-1 rounded">Sell</button>
      <button @click="toggleActive" class="text-sm border px-3 py-1 rounded">{{ product.is_active ? 'Deactivate' : 'Activate' }}</button>
    </div>
  </div>
</template>

<style scoped>
.product-card { border: 1px solid #e5e7eb; }
</style>