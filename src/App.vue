<script setup>
import { ref, computed } from "vue" // ref=เก็บค่าที่เปลี่ยนได้ ใช้สร้างตัวแปรที่ตอบสนอง, computed=คำนวณค่าอัตโนมัติ
import Navbar from "./components/Navbar.vue"
import ProductCard from "./components/ProductCard.vue"
import CartPanel from "./components/CartPanel.vue"

import img350 from "./assets/products/350.jpg"
import img600 from "./assets/products/600.jpg"
import img1500 from "./assets/products/1500.jpg"
import img35012 from "./assets/products/35012.jpg"
import img60012 from "./assets/products/60012.jpg"
import img15006 from "./assets/products/15006.jpg"

import { watch, onMounted } from "vue"

const products = [
  { id: 1, name: "ขวดเล็ก 350 มล.", price: 5, image: img350, size: 350, type: "single" },
  { id: 2, name: "ขวดกลาง 600 มล.", price: 7, image: img600, size: 600, type: "single" },
  { id: 3, name: "ขวดใหญ่ 1500 มล.", price: 14, image: img1500, size: 1500, type: "single" },
  { id: 4, name: "แพ็กขวดเล็ก 12 ขวด 350 มล.", price: 50, image: img35012, size: 350, type: "pack" },
  { id: 5, name: "แพ็กขวดกลาง 12 ขวด 600 มล.", price: 65, image: img60012, size: 600, type: "pack" },
  { id: 6, name: "แพ็กขวดใหญ่ 6 ขวด 1500 มล.", price: 70, image: img15006, size: 1500, type: "pack" }
]

const cart = ref([]) // สร้าง array ว่างเพื่อรอเก็บสินค้าที่ถูกคลิกเพิ่มลงตะกร้า
const search = ref("") // เก็บค่าคำค้นหา

watch(cart, (newCart) => {
  localStorage.setItem("cart", JSON.stringify(newCart))
}, { deep: true })

onMounted(() => {
  const saved = localStorage.getItem("cart")
  if (saved) cart.value = JSON.parse(saved)
})


watch(cart, (newCart) => {
  localStorage.setItem("cart", JSON.stringify(newCart))
}, { deep: true })

onMounted(() => {
  const saved = localStorage.getItem("cart")
  if (saved) cart.value = JSON.parse(saved)
})

function addToCart(product) {
  const item = cart.value.find(i => i.id === product.id) // find=เพื่อเช็คว่ามีสินค้าในตะกร้าหรือยัง เพื่อไม่ให้สินค้าตัวเดิมเพิ่มแถวใหม่ซ้ำๆ
  if (item) item.qty++ // ถ้ามีแล้วให้เพิ่มจำนวน, qty=จำนวนสินค้าในตะกร้า
  else cart.value.push({ ...product, qty: 1 }) // ถ้ายังไม่มีให้เพิ่มสินค้าใหม่ลงตะกร้าม copy object (กัน bug)
}

// เพิ่ม/ลดจำนวนสินค้าในตะกร้า
function increaseQty(p){ // increaseQty=เพิ่มจำนวนสินค้าในตะกร้า
  const i = cart.value.find(x => x.id === p.id)
  if(i) i.qty++
}

function decreaseQty(p){ // decreaseQty=ลดจำนวนสินค้าในตะกร้า, กันไม่ให้ qty ติดลบ
  const i = cart.value.find(x => x.id === p.id)
  if(i && i.qty > 1) i.qty--
}

// ลบสินค้าออกจากตะกร้า
function removeItem(p){ 
  cart.value = cart.value.filter(i => i.id !== p.id) // filter=กรองสินค้าออกจากตะกร้า, กันไม่ให้มีสินค้าที่ถูกลบอยู่ในตะกร้า
}

const filteredProducts = computed(() => { // filteredProducts=สินค้าที่ถูกกรองตามคำค้นหา
  return products
    .filter(p => 
      p.name.toLowerCase().includes(search.value.toLowerCase()) 
    )
    .sort((a, b) => { // sort=เรียงสินค้าในตะกร้า
      if (a.type === "single" && b.type === "pack") return -1 
      if (a.type === "pack" && b.type === "single") return 1 
      return a.size - b.size
    })
})

const sortedCart = computed(() => {
  return [...cart.value].sort((a, b) => {

    if (a.type === "single" && b.type === "pack") return -1
    if (a.type === "pack" && b.type === "single") return 1

    return a.size - b.size
  })
})

const subtotal = computed(() =>
  cart.value.reduce((s,i)=> s + i.price*i.qty,0) // reduce=ยอดรวมสินค้า, s=ยอดรวม, i=สินค้าในตะกร้า, price=ราคาสินค้า, qty=จำนวนสินค้าในตะกร้า
)

const cartCount = computed(() =>
  cart.value.reduce((s,i)=> s + i.qty,0) // reduce=จำนวนสินค้าทั้งหมด
)

const shipping = 10 // ค่าจัดส่งคงที่

const total = computed(() =>
  cart.value.length === 0 ? 0 : subtotal.value + shipping // ถ้าไม่มีสินค้า ไม่คิดค่าส่ง
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
        :cart="sortedCart"
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
