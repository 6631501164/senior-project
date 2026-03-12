<script setup>
import { ref, computed } from "vue"
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

const sortedCart = computed(() => {
  return [...cart.value].sort((a, b) => {

    if (a.type === "single" && b.type === "pack") return -1
    if (a.type === "pack" && b.type === "single") return 1

    return a.size - b.size
  })
})

function addToCart(product) {
  const item = cart.value.find(i => i.id === product.id)

  if (item) {
    item.qty++
  } else {
    cart.value.push({ ...product, qty: 1 })
  }
}

const search = ref("")

const filteredProducts = computed(() => {
  return products
    .filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .sort((a, b) => {

      if (a.type === "single" && b.type === "pack") return -1
      if (a.type === "pack" && b.type === "single") return 1

      return a.size - b.size
    })
})

function increaseQty(product) {
  const item = cart.value.find(i => i.id === product.id)
  if (item) item.qty++
}

function decreaseQty(product) {
  const item = cart.value.find(i => i.id === product.id)
  if (item && item.qty > 1) {
    item.qty--
  }
}

function removeItem(product) {
  cart.value = cart.value.filter(i => i.id !== product.id)
}

const subtotal = computed(() =>
  cart.value.reduce((sum, i) => sum + i.price * i.qty, 0)
)

const cartCount = computed(() =>
  cart.value.reduce((sum, i) => sum + i.qty, 0)
)

const shipping = 10

const total = computed(() => {
  if (cart.value.length === 0) {
    return 0
  }
  return subtotal.value + shipping
})
</script>

<template>

  <div class="container">

    <!-- HEADER -->
    <header class="header">

      <h2>MFU</h2>

      <input v-model="search" type="text" placeholder="Search products" class="search">

      <div class="cart-top">
        🛒 {{ cartCount }} | ฿ {{ total }}
      </div>

    </header>


    <div class="layout">

      <!-- PRODUCT -->
      <div class="products">

        <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" @add="addToCart" />

      </div>

      <!-- CART -->
      <CartPanel :cart="sortedCart" :subtotal="subtotal" :shipping="shipping" :total="total" @increase="increaseQty"
        @decrease="decreaseQty" @remove="removeItem" />

    </div>

  </div>

</template>


<style>
.container {
  max-width: 1200px;
  margin: auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 2px solid black;
}

.search {
  width: 400px;
  padding: 8px;
  border: 2px solid black;
}

.cart-top {
  border: 2px solid black;
  padding: 8px 15px;
}

.layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  padding: 20px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
</style>