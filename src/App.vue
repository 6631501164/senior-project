<script setup>
import { ref } from "vue"
import ProductCard from "./components/ProductCard.vue"
import CartPanel from "./components/CartPanel.vue"

const products = [
  { id: 1, name: "ขวดเล็ก 350 มล.", price: 5 },
  { id: 2, name: "ขวดกลาง 550 มล.", price: 7 },
  { id: 3, name: "ขวดใหญ่ 1500 มล.", price: 14 }
]

const cart = ref([])

function addToCart(product) {
  cart.value.push(product)
}
</script>

<template>
  <div class="layout">

    <div class="products">
      <ProductCard
        v-for="p in products"
        :key="p.id"
        :product="p"
        @add="addToCart"
      />
    </div>

    <CartPanel :cart="cart" />

  </div>
</template>

<style>
.layout{
  display:grid;
  grid-template-columns: 3fr 1fr;
  gap:20px;
  padding:20px;
}

.products{
  display:grid;
  grid-template-columns: repeat(3,1fr);
  gap:20px;
}
</style>