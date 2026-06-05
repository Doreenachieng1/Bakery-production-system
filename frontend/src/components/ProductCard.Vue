<script setup>
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
{
  id: 1,
  name: 'Brown Bread',
  selling_price: 65,
  category: 'bread',
  shelf_life_hours: 24,
  unit: 'loaf',
  is_active: true
},
{
  id: 2,
  name: 'Cinnamon Roll',
  selling_price: 40,
  category: 'pastry',
  shelf_life_hours: 12,
  unit: 'piece',
  is_active: true
},
{
  id: 3,
  name: 'Meat Pie',
  selling_price: 80,
  category: 'pastry',
  shelf_life_hours: 8,
  unit: 'piece',
  is_active: true
},
{
  id: 4,
  name: 'Chapati',
  selling_price: 20,
  category: 'bread',
  shelf_life_hours: 8,
  unit: 'piece',
  is_active: true
}
 const selectProduct = (product) => {
  selectedProduct.value = product
  quantity.value = 1
}  
const urgentCount = computed(() =>
  products.value.filter(
    p => p.shelf_life_hours <= 12
  ).length
)

const fastSellerCount = computed(() =>
  products.value.filter(
    p => p.shelf_life_hours > 12 &&
         p.shelf_life_hours <= 48
  ).length
)

const longShelfLifeCount = computed(() =>
  products.value.filter(
    p => p.shelf_life_hours > 48
  ).length
)
const filteredProducts = computed(() => {
  if (showInactive.value) {
    return products.value
  }

  return products.value.filter(
    product => product.is_active
  )
})
const toggleActive = (product) => {
  product.is_active = !product.is_active
}

</script>

<template>
  <label class="flex items-center gap-2 mb-4">
    <input
    v-model="showInactive"
    type="checkbox"
    />

   Show inactive products
 </label>
  <div class="mb-4 font-semibold">
    🔴 {{ urgentCount }} urgent |
    🟡 {{ fastSellerCount }} fast sellers |
    🟢 {{ longShelfLifeCount }} long shelf life
 </div>
 <ProductCard
  v-for="product in filteredProducts"
  :key="product.id"
  :product="product"
  @sell="selectProduct"
 />
  <div
   v-if="selectedProduct"
   class="mt-6 bg-white p-4 rounded shadow"
    \>
     <h2 class="text-lg font-bold mb-4">
       Confirm Sale
      </h2>

      <p><strong>Product:</strong> {{ selectedProduct.name }}</p>

      <p>
       <strong>Price:</strong>
        KES {{ selectedProduct.selling_price }}
      </p>

      <input
       v-model.number="quantity"
        type="number"
        min="1"
        class="border p-2 rounded mt-3 w-full"
       />

      <p class="mt-3 font-bold">
       Total: KES {{ saleTotal }}
      </p>

      <button
        class="mt-3 bg-green-500 text-white px-4 py-2 rounded"
        >
        Confirm Sale
      </button>
    </div>
    <span
      v-if="product.shelf_life_hours <= 12"
      class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs"
      >
       Urgent Sale
    </span>

    <span
     v-else-if="product.shelf_life_hours <= 48"
     class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs"
     >
     Fast Seller
    </span>

    <span
      v-else
      class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
      >
      Long Shelf Life
    </span>
    <button
     @click="$emit('toggle-active', product)"
     class="text-xs border px-2 py-1 rounded"
     >
      {{ product.is_active ? 'Deactivate' : 'Activate' }}
    </button>
</template>

<style scoped>
  .product-card {
   border: 1px solid #ccc;
   padding: 10px;
   margin-bottom: 10px;
   }
</style>