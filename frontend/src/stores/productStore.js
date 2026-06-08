//pinia store: single source of truth for all product data

//this store is used by:
// - ProductsView (catalog page -browse,filter,serch)
// - SalesView (sales page -select product to sell)
// - DashboardView (dashboard  - product count stat)

import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { useProductStore } from '../stores/productStore';

const productStore = useProductStore()

export const useProductStore = defineStore('product', () => {
  const products = ref([
    { id: 1, name: 'White Bread', category: 'Bread', price: 60, shelf_life_hours: 24, unit: 'loaf', isActive: true },
    { id: 2, name: 'Mandazi', category: 'Bun', price: 10, shelf_life_hours: 72, unit: 'piece', isActive: true },
    { id: 3, name: 'Chocolate Cake', category: 'Dessert', price: 350, shelf_life_hours: 168, unit: 'slice', isActive: false },
    { id: 4, name: 'Blueberry Muffin', category: 'Bread', price: 60, shelf_life_hours: 24, unit: 'piece', isActive: true },
    { id: 5, name: 'Cinnamon Roll', category: 'Bread', price: 50, shelf_life_hours: 24, unit: 'piece', isActive: false },
    { id: 6, name: 'Meat Pie', category: 'Pastry', price: 80, shelf_life_hours: 8, unit: 'piece', isActive: true },
    { id: 7, name: 'Chapati', category: 'Bread', price: 20, shelf_life_hours: 8, unit: 'piece', isActive: true }
    
  ]);
  const isLoading = ref(false);
  const error= ref(null);

  const productCount = computed(() => products.value.length);
  const activeProducts = computed(() => products.value.filter(p => p.isActive));
  const categories = computed(() => {
    const cats = new Set(products.value.map(p => p.category));
    return cats.sort();
  });

  const totalcatalogValue = computed(() => {
    return products.value.reduce((sum, p) => sum + p.price, 0);
  });
  
  

 //.......ACTIONS........
  function addproducts(newproduct) {
     const id = products.value.length + 1;
     //products.value.push({id,...newproduct id:newid})
    }

  return {
    products,
    filteredProducts,
    selectedProduct
  };
});
