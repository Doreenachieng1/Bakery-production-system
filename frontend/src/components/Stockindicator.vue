<script setup>
import { ref } from 'vue'
const props = defineProps({
  stock: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="stock-indicator">
    <p>Stock Level: {{ props.stock.level }}</p>
    <p>Status: {{ props.stock.status }}</p>
  </div>
</template>

<style scoped>
.stock-indicator {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}      
</style>