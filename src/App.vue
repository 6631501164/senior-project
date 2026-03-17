<script setup>
import { ref, computed } from "vue"
import Navbar from "./components/Navbar.vue"
import ProductCard from "./components/ProductCard.vue"
import CartPanel from "./components/CartPanel.vue"

import img350 from "./assets/products/350.jpg"
import img600 from "./assets/products/600.jpg"
import img1500 from "./assets/products/1500.jpg"
import img35012 from "./assets/products/35012.jpg"
import img60012 from "./assets/products/60012.jpg"
import img15006 from "./assets/products/15006.jpg"

const products = [
  { id: 1, name: "ขวดเล็ก 350 มล.", price: 5, image: img350, size: 350, type: "single" },
  { id: 2, name: "ขวดกลาง 600 มล.", price: 7, image: img600, size: 600, type: "single" },
  { id: 3, name: "ขวดใหญ่ 1500 มล.", price: 14, image: img1500, size: 1500, type: "single" },
  { id: 4, name: "แพ็ก 12 ขวด 350 มล.", price: 50, image: img35012, size: 350, type: "pack" },
  { id: 5, name: "แพ็ก 12 ขวด 600 มล.", price: 65, image: img60012, size: 600, type: "pack" },
  { id: 6, name: "แพ็ก 12 ขวด 1500 มล.", price: 70, image: img15006, size: 1500, type: "pack" }
]

const cart = ref([])
const search = ref("")

function addToCart(product) {
  const item = cart.value.find(i => i.id === product.id)
  if (item) item.qty++
  else cart.value.push({ ...product, qty: 1 })
}

function increaseQty(p){
  const i = cart.value.find(x => x.id === p.id)
  if(i) i.qty++
}

function decreaseQty(p){
  const i = cart.value.find(x => x.id === p.id)
  if(i && i.qty > 1) i.qty--
}

function removeItem(p){
  cart.value = cart.value.filter(i => i.id !== p.id)
}

const filteredProducts = computed(() =>
  products.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const subtotal = computed(() =>
  cart.value.reduce((s,i)=> s + i.price*i.qty,0)
)

const cartCount = computed(() =>
  cart.value.reduce((s,i)=> s + i.qty,0)
)

const shipping = 10

const total = computed(() =>
  cart.value.length === 0 ? 0 : subtotal.value + shipping
)
</script>

<template>
  <div class="container">

    <Navbar
      :search="search"
      :cartCount="cartCount"
      :total="total"
      @update:search="val => search = val"
    />

    <div class="layout">

      <div class="products">
        <ProductCard
          v-for="p in filteredProducts"
          :key="p.id"
          :product="p"
          @add="addToCart"
        />
      </div>

      <CartPanel
        :cart="cart"
        :subtotal="subtotal"
        :shipping="shipping"
        :total="total"
        @increase="increaseQty"
        @decrease="decreaseQty"
        @remove="removeItem"
      />

    </div>
  </div>
</template>

<style>
.container{max-width:1200px;margin:auto;}
.layout{display:grid;grid-template-columns:3fr 1fr;gap:20px;padding:20px;}
.products{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;}
</style>