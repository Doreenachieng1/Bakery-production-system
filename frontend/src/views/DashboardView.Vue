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
  
</template>

<style scoped>

</style>  