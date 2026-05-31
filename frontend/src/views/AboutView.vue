<script setup>
// Minimal script for About view
import { ref } from 'vue'

const info = ref('Manage production, inventory and orders efficiently.')
</script>

<template>
	<section class="About">
		<h1>About Our Bakery Production System</h1>
		<p>
			This application helps manage bakery production, inventory, and orders.
		</p>
	</section>
</template>

<style scoped>
.about {
	padding: 24px;
}
.about h1 {
	margin-bottom: 8px;
}
</style>
