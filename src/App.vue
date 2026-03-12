<script setup>
import { ref } from "vue"
import ProductCard from "./components/ProductCard.vue"
import CartPanel from "./components/CartPanel.vue"
import img350 from "./assets/products/350.jpg"
import img600 from "./assets/products/600.jpg"
import img1500 from "./assets/products/1500.jpg"
import img35012 from "./assets/products/35012.jpg"
import img60012 from "./assets/products/60012.jpg"
import img15006 from "./assets/products/15006.jpg"


const products = [
  { id: 1, name: "ขวดเล็ก 350 มล.", price: 5, image: img350 },
  { id: 2, name: "ขวดกลาง 600 มล.", price: 7, image: img600},
  { id: 3, name: "ขวดใหญ่ 1500 มล.", price: 14, image: img1500 },
  { id: 4, name: "ขวดเล็กแบบแพ็ก(12ขวด).", price: 50, image: img35012 },
  { id: 5, name: "ขวดกลางแบบแพ็ก(12ขวด).", price: 65, image: img60012 },
  { id: 6, name: "ขวดใหญ่แบบแพ็ก(12ขวด)", price: 70, image: img15006 }
]

const cart = ref([])

function addToCart(product) {
  const item = cart.value.find(i => i.id === product.id)

  if (item) {
    item.qty++
  } else {
    cart.value.push({ ...product, qty: 1 })
  }
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
.container{
  max-width:1200px;
  margin:auto;
  padding:20px;
}
.layout{
  display:grid;
  grid-template-columns: 3fr 1fr;
  gap:20px;
  padding:20px;
}

.products{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
  gap:20px;
}
</style>