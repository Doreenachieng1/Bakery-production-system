<script setup>
import { computed, ref } from "vue";

const ingredients = ref([
  {
    id: 1,
    name: "Flour",
    current_stock: 50,
    reorder_level: 20,
    unit: "kg",
    cost_per_unit: 120,
  },
  {
    id: 2,
    name: "Eggs",
    current_stock: 5,
    reorder_level: 10,
    unit: "trays",
    cost_per_unit: 350,
  },
  {
    id: 3,
    name: "Cooking Oil",
    current_stock: 15,
    reorder_level: 8,
    unit: "litres",
    cost_per_unit: 250,
  },

  // Added ingredients
  {
    id: 4,
    name: "Yeast",
    current_stock: 2,
    reorder_level: 1,
    unit: "kg",
    cost_per_unit: 800,
  },
  {
    id: 5,
    name: "Sugar",
    current_stock: 30,
    reorder_level: 10,
    unit: "kg",
    cost_per_unit: 150,
  },
  {
    id: 6,
    name: "Cocoa Powder",
    current_stock: 5,
    reorder_level: 3,
    unit: "kg",
    cost_per_unit: 600,
  },
  {
    id: 7,
    name: "Butter",
    current_stock: 8,
    reorder_level: 5,
    unit: "kg",
    cost_per_unit: 500,
  },
  {
    id: 8,
    name: "Milk",
    current_stock: 20,
    reorder_level: 10,
    unit: "litres",
    cost_per_unit: 70,
  },
]);

// Determine stock status
const getStatus = (ingredient) => {
  if (ingredient.current_stock === 0) {
    return "danger";
  }

  if (ingredient.current_stock <= ingredient.reorder_level) {
    return "warning";
  }

  return "healthy";
};

// Task 2: Low stock count
const lowStockCount = computed(() => {
  return ingredients.value.filter(
    (ingredient) =>
      ingredient.current_stock <= ingredient.reorder_level
  ).length;
});

// Task 3: Total stock value
const totalStockValue = computed(() => {
  return ingredients.value.reduce((total, ingredient) => {
    return (
      total +
      ingredient.current_stock * ingredient.cost_per_unit
    );
  }, 0);
});

// Task 4: Sort by status severity
const sortedIngredients = computed(() => {
  const statusPriority = {
    danger: 1,
    warning: 2,
    healthy: 3,
  };

  return [...ingredients.value].sort((a, b) => {
    return (
      statusPriority[getStatus(a)] -
      statusPriority[getStatus(b)]
    );
  });
});
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800">
        Inventory Dashboard
      </h1>
      <p class="text-gray-600">
         Manage bakery ingredients and stock levels
      </p>
    </div>

    <!-- Summary Cards -->
    <div class="grid gap-4 md:grid-cols-2 mb-6">
      <!-- Low Stock -->
      <div
        class="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl shadow"
      >
        <h2 class="text-lg font-semibold">
          ⚠️ {{ lowStockCount }} ingredients need reordering
        </h2>
      </div>

      <!-- Total Stock Value -->
      <div
        class="bg-white p-4 rounded-xl shadow border border-gray-200"
      >
        <h2 class="text-lg font-semibold text-gray-700">
          Total stock value:
        </h2>

        <p class="text-2xl font-bold text-green-600">
          KES {{ totalStockValue.toLocaleString() }}
        </p>
      </div>
    </div>

    <!-- Ingredients Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="ingredient in sortedIngredients"
        :key="ingredient.id"
        class="bg-white rounded-2xl shadow p-5 border"
        :class="{
          'border-red-500 bg-red-50':
            getStatus(ingredient) === 'danger',

          'border-yellow-500 bg-yellow-50':
            getStatus(ingredient) === 'warning',

          'border-green-500 bg-green-50':
            getStatus(ingredient) === 'healthy',
        }"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-xl font-bold text-gray-800">
            {{ ingredient.name }}
          </h2>

          <span
            class="px-3 py-1 rounded-full text-sm font-semibold"
            :class="{
              'bg-red-200 text-red-700':
                getStatus(ingredient) === 'danger',

              'bg-yellow-200 text-yellow-700':
                getStatus(ingredient) === 'warning',

              'bg-green-200 text-green-700':
                getStatus(ingredient) === 'healthy',
            }"
          >
            {{ getStatus(ingredient) }}
          </span>
        </div>

        <div class="space-y-2 text-gray-700">
          <p>
            <span class="font-semibold">Current Stock:</span>
            {{ ingredient.current_stock }}
            {{ ingredient.unit }}
          </p>

          <p>
            <span class="font-semibold">Reorder Level:</span>
            {{ ingredient.reorder_level }}
            {{ ingredient.unit }}
          </p>

          <p>
            <span class="font-semibold">Cost Per Unit:</span>
            KES {{ ingredient.cost_per_unit }}
          </p>

          <p class="font-bold text-blue-600">
            Stock Value:
            KES
            {{
              (
                ingredient.current_stock *
                ingredient.cost_per_unit
              ).toLocaleString()
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>