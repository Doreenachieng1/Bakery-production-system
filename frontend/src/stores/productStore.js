// ---------------------------------------------------------------
//pinia store: single source of truth for all product data

//this store is used by:
// - ProductsView (catalog page -browse,filter,serch)
// - SalesView (sales page -select product to sell)
// - DashboardView (dashboard  - product count stat)

// In Week 6, the hardcoded array becomes an API call:
//   await axios.get('/api/products')
//
// The store pattern: STATE (data) + GETTERS (computed) + ACTIONS (functions)
// ---------------------------------------------------------------

import { defineStore } from 'pinia'
import { ref, computed } from 'vue';


export const useProductStore = defineStore('product', () => {
    // ==================== STATE ====================
  // Same data shape as PRODUCTS table from the ERD
  // fetchProducts() will replace this hardcoded data in Week 6

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
 function addProduct(newProduct) {
    // In a real app, this would POST to the API and get back the created product with an ID
    const newId = Math.max(...products.value.map(p => p.id)) + 1
   products.value.push({...newProduct, id: newId})
  }

  function updateProduct(productId, updates) {
    // Week 6: await axios.put(`/api/products/${productId}`, updates)
    const product = products.value.find(p => p.id === productId)
    if (product) Object.assign(product, updates)
  }

  function toggleActive(productId) {
    const product = products.value.find(p => p.id === productId)
    if (product) product.is_active = !product.is_active
  }

  function deleteProduct(productId) {
    // Week 6: await axios.delete(`/api/products/${productId}`)
   products.value = products.value.filter(p => p.id !== productId)
 }

  // In Week 6, this replaces the hardcoded data:
  // async function fetchProducts() {
  //   isLoading.value = true
  //   error.value = null
  //   try {
  //     const response = await axios.get('/api/products')
  //     products.value = response.data
  //   } catch (err) {
  //     error.value = 'Failed to load products'
  //   } finally {
  //     isLoading.value = false
  //   }
  // }

  return {
    // State
    products, isLoading, error,
    // Getters
    productCount, activeProducts, categories, totalCatalogValue,
    // Actions
    addProduct, updateProduct, toggleActive,deleteProduct
  }
});
